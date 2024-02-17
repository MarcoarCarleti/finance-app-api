import { PostgresHelper } from '../../db/postgres/helper.js'

export class PortgresUpdateUserRepository {
    async execute(userId, updateUserParams) {
        const updateFields = []
        const updatedValues = []

        Object.keys(updateUserParams).forEach((key) => {
            updateFields.push(`${key} = $${updatedValues.length + 1}`)
            updatedValues.push(updateUserParams[key])
        })

        updatedValues.push(userId)

        const updatedQuery = `
        UPDATE users 
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
