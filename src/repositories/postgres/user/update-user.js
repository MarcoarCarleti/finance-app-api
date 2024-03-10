import { prisma } from '../../../../prisma/prisma.js'
export class PostgresUpdateUserRepository {
    async execute(userId, updateUserParams) {
        try {
            return await prisma.user.update({
                where: {
                    id: userId,
                },
                data: updateUserParams,
            })
        } catch (error) {
            return null
        }
    }
}
