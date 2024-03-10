import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
    userNotFoundResponse,
} from '../helpers/index.js'

export class DeleteUserControlller {
    constructor(deleteUserUseCase) {
        this.deleteUserUseCase = deleteUserUseCase
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const isIdValid = checkIfIdIsValid(userId)

            if (!isIdValid) {
                return invalidIdResponse()
            }

            const deletedUser = await this.deleteUserUseCase.execute(userId)

            if (!deletedUser) {
                return userNotFoundResponse()
            }

            return ok(deletedUser)
        } catch (error) {
            console.log(error)
            return serverError(error)
        }
    }
}
