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

        const _totalExpenses = totalExpenses || 0
        const _totalEarnings = totalEarnings || 0
        const _totalInvestiments = totalInvestiments || 0

        const balance = _totalExpenses - _totalEarnings - _totalInvestiments

        return {
            earnings: _totalEarnings,
            expenses: _totalExpenses,
            investiments: _totalInvestiments,
            balance,
        }
    }
}
