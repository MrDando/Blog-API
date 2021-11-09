import { checkSchema } from 'express-validator'

export const createCommentValidationSchema = checkSchema({
    text: {
        in: ['body'],
        exists: {
            errorMessage: 'Comment body is required',
            options: { checkFalsy: true },
            bail: true
        },
        trim: {},
        escape: {},
        isLength: {
            errorMessage: 'Comments have a max size of 500 characters',
            options: { max: 500 },
        }
    }
})