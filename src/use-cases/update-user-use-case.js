import { EmailAlreadyInUseError } from '../errors/user.js'
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js'
import { PostgresUpdateUserRepository } from '../repositories/postgres/update-user.js'
import bcrypt from 'bcrypt'

export class UpdateUserUseCase {
    async execute(userId, updateUserParams) {
        //  se o e-mail estiver sendo atualizado, verificar se ele está em uso

        if (updateUserParams.email) {
            const postgresGetUserByEmailRepository =
                new PostgresGetUserByEmailRepository()

            const userWithProvidedEmail =
                await postgresGetUserByEmailRepository.execute(
                    updateUserParams.email,
                )

            if (userWithProvidedEmail) {
                throw new EmailAlreadyInUseError(updateUserParams.email)
            }
        }

        // se a senha estiver sendo atualizada, criptografá-la

        const user = {
            ...updateUserParams
        }

        if (updateUserParams.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                10,
            )

            user.password = hashedPassword
        }

        // chamar o repository para atualizar o usuario
        const updateUserRepository = new PostgresUpdateUserRepository()

        const updatedUser = await updateUserRepository.execute(userId, user)

        return updatedUser
    }
}
