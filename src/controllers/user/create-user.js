import { EmailAlreadyInUseError } from '../../errors/user.js'
import { createUserSchema } from '../../schemas/index.js'
import { badRequest, created, serverError } from '../helpers/index.js'
import * as z from 'zod'

export class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase
    }
    async execute(httpRequest) {
        try {
            

            const params = httpRequest.body

            await createUserSchema.parseAsync(params)

            const createdUser = await this.createUserUseCase.execute(params)

            return created(createdUser)
        } catch (err) {
            if (err instanceof z.ZodError) {
                return badRequest({
                    message: err.errors[0].message,
                })
            }

            if (err instanceof EmailAlreadyInUseError) {
                return badRequest({ message: err.message })
            }
            console.error(err)
            return serverError({ message: err.message })
        }
    }
}
