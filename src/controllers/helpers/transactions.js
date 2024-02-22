import validator from 'validator'

export const checkIfAmountIsValid = (transaction) =>
    validator.isCurrency(transaction.toString(), {
        digits_after_decimal: [2],
        allow_decimal: false,
        decimal_separator: ',',
    })
