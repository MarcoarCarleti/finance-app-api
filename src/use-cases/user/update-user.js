import { EmailAlreadyInUseError } from '../../errors/user.js'
import bcrypt from 'bcrypt'

export class UpdateUserUseCase {
    constructor(postgresGetUserByEmailRepository, updateUserRepository) {
        ;(this.postgresGetUserByEmailRepository =
            postgresGetUserByEmailRepository),
            (this.updateUserRepository = updateUserRepository)
    }
    async execute(userId, updateUserParams) {
        //  se o e-mail estiver sendo atualizado, verificar se ele está em uso

        if (updateUserParams.email) {
            const userWithProvidedEmail =
                await this.postgresGetUserByEmailRepository.execute(
                    updateUserParams.email,
                )

            if (userWithProvidedEmail && userWithProvidedEmail.id !== userId) {
                throw new EmailAlreadyInUseError(updateUserParams.email)
            }
        }

        // se a senha estiver sendo atualizada, criptografá-la

        const user = {
            ...updateUserParams,
        }

        if (updateUserParams.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                10,
            )

            user.password = hashedPassword
        }

        // chamar o repository para atualizar o usuario

        const updatedUser = await this.updateUserRepository.execute(
            userId,
            user,
        )

        return updatedUser
    }
}
