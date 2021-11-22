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
            errorMessage: 'Username must be longer than 3 and shorter than 30 characters',
            options: { min: 4, max: 30},
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

export const updateRolesSchema = checkSchema({
    isAdmin: {
        in: ['body'],
        exists: {
            errorMessage: 'isAdmin is required',
            bail: true
        },
        isBoolean: {
            errorMessage: 'isAdmin need to be a boolean value'
        }
    },
    isCreator: {
        in: ['body'],
        exists: {
            errorMessage: 'isCreator is required',
            bail: true
        },
        isBoolean: {
            errorMessage: 'isCreator need to be a boolean value'
        }
    }
})