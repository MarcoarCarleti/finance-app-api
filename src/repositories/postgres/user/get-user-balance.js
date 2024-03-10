import { Prisma } from '@prisma/client'
import { prisma } from '../../../../prisma/prisma.js'

export class PostgresGetUserBalanceRepository {
    constructor() {}

    async execute(userId) {
        const {
            _sum: { amount: totalExpenses },
        } = await prisma.transaction.aggregate({
            where: {
                user_id: userId,
                type: 'EXPENSE',
            },
            _sum: {
                amount: true,
            },
        })

        const {
            _sum: { amount: totalEarnings },
        } = await prisma.transaction.aggregate({
            where: {
                user_id: userId,
                type: 'EARNING',
            },
            _sum: {
                amount: true,
            },
        })

        const {
            _sum: { amount: totalInvestiments },
        } = await prisma.transaction.aggregate({
            where: {
                user_id: userId,
                type: 'INVESTIMENT',
            },
            _sum: {
                amount: true,
            },
        })

        const _totalExpenses = totalExpenses || new Prisma.Decimal(0)
        const _totalEarnings = totalEarnings || new Prisma.Decimal(0)
        const _totalInvestiments = totalInvestiments || new Prisma.Decimal(0)

        const balance = new Prisma.Decimal(
            _totalEarnings - _totalExpenses - _totalInvestiments,
        )

        return {
            earnings: _totalEarnings,
            expenses: _totalExpenses,
            investiments: _totalInvestiments,
            balance,
        }
    }
}
