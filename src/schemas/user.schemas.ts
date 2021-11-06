import { checkSchema } from 'express-validator'

import User from '../models/user.model'

export const signupValidationSchema = checkSchema({
    username: {
        in: ['body'],
        exists: {
            errorMessage: 'Username is required',
            options: { checkFalsy: true },
            bail: true
        },
        trim: {},
        escape: {},
        isLength: {
            errorMessage: 'Username must contain at least 4 characters',
            options: { min: 4 },
        },
        isAlphanumeric: {
            errorMessage: 'Username can only contain letters and numbers',
            bail: true
        },
        custom: {
            errorMessage: 'Username already exists',
            options: ((username) => {
                return User.findOne({ username: username }).then((user) => {
                    if (user) {
                        throw new Error('Username is not available');
                    }
                })
            })
        }
    },
    password: {
        in: ['body'],
        exists: {
            errorMessage: 'Password is required',
            options: { checkFalsy: true },
            bail: true
        },
        trim: {},
        escape: {},
        isAlphanumeric: {
            errorMessage: 'Password can only contain letters and numbers'
        },
        isLength: {
            errorMessage: 'Password must contain at least 6 characters',
            options: { min: 6 },
        }
    },
    passwordConfirm: {
        in: ['body'],
        exists: {
            errorMessage: 'Password confirmation is required',
            options: { checkFalsy: true },
            bail: true
        },
        custom: {
            errorMessage: 'Passwords do not match',
            options: ((value, { req }) => value === req.body.password)
        }
    }
})

export const loginValidationSchema = checkSchema({
    username: {
        in: ['body'],
        exists: {
            errorMessage: 'Username is required',
            options: { checkFalsy: true },
        },
        trim: {},
        escape: {}
    },
    password: {
        in: ['body'],
        exists: {
            errorMessage: 'Password is required',
            options: { checkFalsy: true },
        },
        trim: {},
        escape: {}
    }
})