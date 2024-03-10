import { prisma } from '../../../../prisma/prisma.js'

export class PostgresUpdateTransactionRepository {
    constructor() {}

    async execute(transactionId, updateTransactionParams) {
        try {
            return await prisma.transaction.update({
                where: {
                    id: transactionId,
                },
                data: updateTransactionParams,
            })
        } catch (error) {
            return null
        }
    }
}
