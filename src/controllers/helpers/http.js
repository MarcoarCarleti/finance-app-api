export const badRequest = (body) => ({
    statusCode: 400,
    body,
})

export const created = (body) => ({
    statusCode: 200,
    body,
})
export const serverError = (body) => ({
    statusCode: 500,
    body,
})

export const ok = (body) => ({
    statusCode: 200,
    body,
})

export const notFound = (field) => ({
    statusCode: 404,
    body: {
        message: `${field} not found`,
    },
})
