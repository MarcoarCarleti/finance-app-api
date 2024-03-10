import { CreateUserController } from '../index.js'
import { faker } from '@faker-js/faker'

describe('Create User Controller', () => {
    class CreateUserUseCaseStub {
        execute(user) {
            return user
        }
    }

    it('should return 200 when creating a user successfully', async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 7 }),
            },
        }

        // act

        const result = await createUserController.execute(httpRequest)

        // assert

        expect(result.statusCode).toBe(200)
        expect(result.body).toEqual(httpRequest.body)
    })

    it('should return 400 if first_name is not provided', async () => {
        // arrange

        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 7 }),
            },
        }

        // act

        const result = await createUserController.execute(httpRequest)

        // assert

        expect(result.statusCode).toBe(400)
        expect(result.body.first_name).toBeUndefined()
    })

    it('should return 400 if last_name is not provided', async () => {
        // arrange

        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 7 }),
            },
        }

        // act

        const result = await createUserController.execute(httpRequest)

        // assert

        expect(result.statusCode).toBe(400)
        expect(result.body.last_name).toBeUndefined()
    })

    it('should return 400 if email is not provided', async () => {
        // arrange

        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                password: faker.internet.password({ length: 7 }),
            },
        }

        // act

        const result = await createUserController.execute(httpRequest)

        // assert

        expect(result.statusCode).toBe(400)
        expect(result.body.email_name).toBeUndefined()
    })

    it('should return 400 if email is not a email', async () => {
        // arrange

        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: 'invalid_email',
                password: faker.internet.password({ length: 7 }),
            },
        }

        // act

        const result = await createUserController.execute(httpRequest)

        // assert

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if password is not provided', async () => {
        // arrange

        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
            },
        }

        // act

        const result = await createUserController.execute(httpRequest)

        // assert

        expect(result.statusCode).toBe(400)
        expect(result.body.password).toBeUndefined()
    })

    it('should return 400 if password is less than 6 characters', async () => {
        // arrange

        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 5 }),
            },
        }

        // act

        const result = await createUserController.execute(httpRequest)

        // assert

        expect(result.statusCode).toBe(400)
    })

    it('should call CreateUserUseCase with correct params', async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 7 }),
            },
        }

        const executeSpy = jest.spyOn(createUserUseCase, 'execute')

        // act
        await createUserController.execute(httpRequest)

        // assert
        expect(executeSpy).toHaveBeenCalledWith(httpRequest.body)
        expect(executeSpy).toHaveBeenCalledTimes(1)
    })

    it('should return 500 if CreateUserUseCase throws an error', async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 7 }),
            },
        }

        const executeSpy = jest.spyOn(createUserUseCase, 'execute')

        executeSpy.mockImplementationOnce(() => {
            throw new Error()
        })

        // act
        const result = await createUserController.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(500)
    })

    it('should return 500 if CreateUserUseCase throws EmailIsAlreadyInUseError', async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 7 }),
            },
        }

        const executeSpy = jest.spyOn(createUserUseCase, 'execute')

        executeSpy.mockImplementationOnce(() => {
            throw new EmailAlreadyInUseError()
        })

        // act
        const result = await createUserController.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(500)
    });
})
