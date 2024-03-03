import {
    checkIfIdIsValid,
    invalidIdResponse,
    serverError,
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
            
            const transaction = await this.deleteTransactionUseCase.execute(transactionId)

            return transaction
        } catch (err) {
            console.log(err)

            return serverError({
                message: err.message,
            })
        }
    }
}
