import validator from 'validator'
import { badRequest } from './http.js'

export const checkIfAmountIsValid = (transaction) => {
    return validator.isCurrency(transaction.toString(), {
        digits_after_decimal: [2],
        allow_negatives: false,
        allow_decimal: false,
    })
}

export const checkIfTypeIsValid = (type) => {
    return ['EARNING', 'EXPENSE', 'INVESTIMENT'].includes(type)
}

export const invalidAmountResponse = () => {
    return badRequest({
        message: 'The amount must be a valid currency.',
    })
}

export const invalidTypeResponse = () => {
    return badRequest({
        message: 'The type must be EARNING, EXPENSE or INVESTIMENT.',
    })
}
