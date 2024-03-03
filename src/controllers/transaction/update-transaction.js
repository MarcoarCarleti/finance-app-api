import {
    badRequest,
    checkIfAmountIsValid,
    checkIfIdIsValid,
    checkIfTypeIsValid,
    invalidAmountResponse,
    invalidIdResponse,
    invalidTypeResponse,
    ok,
    serverError,
    transactionNotFoundResponse,
} from '../helpers/index.js'

export class UpdateTransactionController {
    constructor(updateTransactionUseCase) {
        this.updateTransactionUseCase = updateTransactionUseCase
    }

    async execute(httpRequest) {
        try {
            // verificar se o id da transação é valido

            const transactionId = httpRequest.params.transactionId

            const idIsValid = checkIfIdIsValid(transactionId)

            if (!idIsValid) {
                return invalidIdResponse(transactionId)
            }

            const params = httpRequest.body

            const allowedFields = ['name', 'date', 'amount', 'type']

            const someFieldIsNotAllowed = Object.keys(params).some(
                (fields) => !allowedFields.includes(fields),
            )

            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some provided field is not allowed',
                })
            }

            if (params.amount) {
                const amountIsValid = checkIfAmountIsValid(params.amount)

                if (!amountIsValid) {
                    return invalidAmountResponse()
                }
            }

            if (params.type) {
                const typeIsValid = checkIfTypeIsValid(params.type)

                if (!typeIsValid) {
                    return invalidTypeResponse()
                }
            }

            const updatedTransaction =
                await this.updateTransactionUseCase.execute(
                    transactionId,
                    params,
                )

            if (!updatedTransaction) {
                return transactionNotFoundResponse()
            }

            return ok(updatedTransaction)
        } catch (err) {
            console.log(err)
            return serverError({ message: err.message })
        }
    }
}
