import { DeleteUserUseCase } from '../use-cases/index.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
} from './helpers/index.js'

export class DeleteUserControlller {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const isIdValid = checkIfIdIsValid(userId)

            if (!isIdValid) {
                return invalidIdResponse()
            }

            const deleteUserUseCase = new DeleteUserUseCase()

            const deletedUser = await deleteUserUseCase.execute(userId)

            return ok(deletedUser)
        } catch (error) {
            console.log(error)
            return serverError(error)
        }
    }
}
