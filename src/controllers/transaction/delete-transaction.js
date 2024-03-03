import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
    transactionNotFoundResponse,
} from '../helpers/index.js'

export class DeleteTransactionController {
    constructor(deleteTransactionUseCase) {
        this.deleteTransactionUseCase = deleteTransactionUseCase
    }

    async execute(httpRequest) {
        try {
            const transactionId = httpRequest.params.transactionId

            const idIsValid = checkIfIdIsValid(transactionId)

            if (!idIsValid) {
                return invalidIdResponse(transactionId)
            }

            const deletedTransaction =
                await this.deleteTransactionUseCase.execute(transactionId)

            if (!deletedTransaction) {
                return transactionNotFoundResponse()
            }

            return ok(deletedTransaction)
        } catch (err) {
            console.log(err)

            return serverError({
                message: err.message,
            })
        }
    }
}
