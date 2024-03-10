import { ZodError } from 'zod'
import { EmailAlreadyInUseError } from '../../errors/user.js'
import { updateUserSchema } from '../../schemas/index.js'
import {
    invalidIdResponse,
    checkIfIdIsValid,
    badRequest,
    ok,
    serverError,
} from '../helpers/index.js'

export class UpdateUserController {
    constructor(updateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const isIdValid = checkIfIdIsValid(userId)

            if (!isIdValid) {
                return invalidIdResponse()
            }

            const params = httpRequest.body

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            const someFieldIsNotAllowed = Object.keys(params).some(
                (fields) => !allowedFields.includes(fields),
            )

            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some provided field is not allowed',
                })
            }

            await updateUserSchema.parseAsync(params)

            const updatedUser = await this.updateUserUseCase.execute(
                userId,
                params,
            )

            return ok(updatedUser)
        } catch (err) {
            if (err instanceof ZodError) {
                return badRequest({
                    message: err.errors[0].message,
                })
            }

            if (err instanceof EmailAlreadyInUseError) {
                return badRequest({ message: err.message })
            }
            return serverError({ message: err.message })
        }
    }
}
