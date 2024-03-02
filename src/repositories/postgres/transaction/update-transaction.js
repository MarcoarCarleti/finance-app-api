import { PostgresHelper } from '../../../db/postgres/helper.js'

export class PostgresUpdateTransactionRepository {
    constructor() {}

    async execute(transactionId, updateTransactionParams) {
        const updateFields = []
        const updatedValues = []

        Object.keys(updateTransactionParams).forEach((key) => {
            updateFields.push(`${key} = $${updatedValues.length + 1}`)
            updatedValues.push(updateTransactionParams[key])
        })

        updatedValues.push(transactionId)

        const updatedQuery = `
        UPDATE transactions 
        SET ${updateFields.join(', ')}
        WHERE id = $${updatedValues.length}
        RETURNING *
        `

        const updatedUser = await PostgresHelper.query(
            updatedQuery,
            updatedValues,
        )

        return updatedUser[0]
    }
}
