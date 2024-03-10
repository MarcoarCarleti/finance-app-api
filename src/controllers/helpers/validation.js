import validator from 'validator'
import { badRequest } from './http.js'

export const invalidIdResponse = () => {
    return badRequest({ message: 'The provided id is not valid' })
}

export const checkIfIdIsValid = (id) => validator.isUUID(id)

export const requiredFieldIsMissingResponse = (field) => {
    return badRequest({
        message: `Missing params: ${field}`,
    })
}

export const checkIfIsString = (value) => typeof value === 'string'
