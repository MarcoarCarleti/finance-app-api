import { UserNotFoundError } from '../../errors/user.js'
import { ok, badRequest, serverError } from '../helpers/http.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
    requiredFieldIsMissingResponse,
} from '../helpers/validation.js'

export class GetTransactionsByUserIdController {
    constructor(getTransactionsByUserIdUseCase) {
        this.getTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.query.userId

            // verificar se o userId foi passado como parâmetro

            if (!userId) {
                return requiredFieldIsMissingResponse('userId')
            }

            // verificar se o userId é um ID válido

            const userIdIsValid = checkIfIdIsValid(userId)

            if (!userIdIsValid) {
                return invalidIdResponse()
            }

            // chamar o use case

            const transactions =
                await this.getTransactionsByUserIdUseCase.execute({
                    userId,
                })

            // retornar resposta http

            return ok(transactions)
        } catch (err) {
            console.log(err)

            if (err instanceof UserNotFoundError) {
                return badRequest({ message: err.message })
            }

            return serverError({ message: err.message })
        }
    }
}
