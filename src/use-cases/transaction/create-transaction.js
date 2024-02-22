import { UserNotFoundError } from '../../errors/user'
import { v4 as uuidv4 } from 'uuid'

export class createTransactionUseCase {
    constructor(createTransactionRepository, getUserByIdRepository) {
        this.createTransactionRepository = createTransactionRepository
        this.getUserByIdRepository = getUserByIdRepository
    }

    async execute(createTransactionParams) {
        // validar se o usuário existe

        const userId = createTransactionParams.userId

        const user = await this.getUserByIdRepository.execute(userId)

        if (!user) {
            return UserNotFoundError(userId)
        }

        const transactionId = uuidv4()

        const transaction = await this.createTransactionRepository.execute({
            ...createTransactionParams,
            id: transactionId,
        })

        return transaction
    }
}