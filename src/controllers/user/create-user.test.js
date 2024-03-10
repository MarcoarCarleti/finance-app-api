import { CreateUserController } from '../index.js'

describe('Create User Controller', () => {
    class CreateUserUseCaseStub {
        execute(user) {
            return user
        }
    }

    it('should return 200 when creating a user successfully', async () => {
        // arrange
        const createUserUseCaseStub = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(
            createUserUseCaseStub,
        )

        const httpRequest = {
            body: {
                first_name: 'Marco',
                last_name: 'Carleti',
                email: 'marcarleti@gmail.com',
                password: '1234567',
            },
        }

        // act

        const result = await createUserController.execute(httpRequest)

        // assert

        expect(result.statusCode).toBe(200)
        expect(result.body).toBeTruthy()
    })

    it('should return 400 if first_name is not provided', async () => {
        // arrange

        const createUserUseCaseStub = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(
            createUserUseCaseStub,
        )

        const httpRequest = {
            body: {
                last_name: 'Carleti',
                email: 'marcarleti@gmail.com',
                password: '1234567',
            },
        }

        // act

        const result = await createUserController.execute(httpRequest)

        // assert

        expect(result.statusCode).toBe(400)
        expect(result.body.first_name).toBeUndefined()
    })
})
