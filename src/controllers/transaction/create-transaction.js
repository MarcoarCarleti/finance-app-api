import {
    checkIfAmountIsValid,
    checkIfIdIsValid,
    checkIfTypeIsValid,
    created,
    invalidAmountResponse,
    invalidIdResponse,
    invalidTypeResponse,
    requiredFieldIsMissingResponse,
    serverError,
    validateRequiredFields,
} from '../helpers/index.js'

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            const requiredFields = ['user_id', 'name', 'date', 'amount', 'type']

            const { ok: requiredFieldsWereProvided, missingField } =
                validateRequiredFields(params, requiredFields)

            if (!requiredFieldsWereProvided) {
                return requiredFieldIsMissingResponse(missingField)
            }

            // verificar se o id do usuário é valido

            const userId = params.user_id

            const isIdValid = checkIfIdIsValid(userId)

            if (!isIdValid) {
                return invalidIdResponse()
            }

            // verificar se o valor da transação é válido

            const amount = params.amount

            const amountIsValid = checkIfAmountIsValid(amount)

            if (!amountIsValid) {
                return invalidAmountResponse()
            }

            // verificar se o tipo da transação é válido

            const transactionType = params.type.trim().toUpperCase()

            const typeIsValid = checkIfTypeIsValid(transactionType)

            if (!typeIsValid) {
                return invalidTypeResponse()
            }

            // criar a transação

            const transaction = await this.createTransactionUseCase.execute({
                ...params,
                type: transactionType,
            })

            return created(transaction)
        } catch (err) {
            console.error(err)
            return serverError({ message: err.message })
        }
    }
}
