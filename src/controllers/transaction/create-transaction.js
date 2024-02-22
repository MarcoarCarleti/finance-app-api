import {
    badRequest,
    checkIfAmountIsValid,
    checkIfIdIsValid,
    created,
    invalidIdResponse,
    serverError,
} from '../helpers/index.js'

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            const requiredFields = [
                'id',
                'user_id',
                'name',
                'date',
                'amount',
                'type',
            ]

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({ message: `Missing params: ${field}` })
                }
            }

            // verificar se o id do usuário é valido

            const userId = params.userId

            const isIdValid = checkIfIdIsValid(userId)

            if (!isIdValid) {
                return invalidIdResponse()
            }

            // verificar se o valor da transação é válido

            const amount = params.amount

            if (amount <= 0) {
                return badRequest({
                    message: 'The amount must greater than 0.',
                })
            }

            const amountIsValid = checkIfAmountIsValid()

            if (!amountIsValid) {
                return badRequest({
                    message: 'The amount must be a valid currency.',
                })
            }

            // verificar se o tipo da transação é válido

            const transactionType = params.type.trim().toUpperCase()

            const typeIsValid = ['EARNING', 'EXPENSE', 'INVESTIMENT'].includes(
                transactionType,
            )

            if (!typeIsValid) {
                return badRequest({
                    message:
                        'The type must be EARNING, EXPENSE or INVESTIMENT.',
                })
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
