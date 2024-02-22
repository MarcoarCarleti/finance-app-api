import validator from 'validator'
import { badRequest, notFound } from './http.js'

export const invalidPasswordResponse = () => {
    return badRequest({
        message: 'Password must be less than 6 characters',
    })
}

export const emailIsAlreadyInUseResponse = () => {
    return badRequest({
        message: 'Invalid e-mail. Please provide a valid one',
    })
}

export const userNotFoundResponse = () => notFound('User')

export const checkIfPasswordIsValid = (password) => password.length > 6

export const checkIfEmailIsValid = (email) => validator.isEmail(email)
