import validator from 'validator'
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import { ok, serverError, badRequest, notFound } from './helpers.js'

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const isUserIdValid = validator.isUUID(httpRequest.params.userId)

            if (!isUserIdValid) {
                return badRequest({ message: 'The provided id is not valid' })
            }

            const getUserByIdUseCase = new GetUserByIdUseCase()

            const user = await getUserByIdUseCase.execute(
                httpRequest.params.userId,
            )

            if (!user) {
                return notFound('User')
            }

            return ok(user)
        } catch (err) {
            console.error(err)
            return serverError({ message: err.message })
        }
    }
}
