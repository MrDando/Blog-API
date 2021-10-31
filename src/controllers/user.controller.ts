import { Request, Response, NextFunction} from 'express'
import { body } from 'express-validator'

import User from '../models/user.model'
import validateResults from '../middleware/validateResults'
import createUser from '../middleware/createUser'

export const signup = [
    body('username')
        .exists({checkFalsy: true}).withMessage('Username is required').bail()
        .isAlphanumeric().withMessage('Username can only contain letters and numbers')
        .isLength({ min: 3}).withMessage('Username must contain at least 3 characters')
        .custom((username) => {
            return User.findOne({ username: username }).then((user) => {
                if (user) {
                    throw new Error('Username is not available');
                }
            })
        }).withMessage('Username already exists')
        .trim()
        .escape(),
    body('password')
        .exists({checkFalsy: true}).withMessage('Password is required').bail()
        .isAlphanumeric().withMessage('Password can only contain letters and numbers')
        .isLength({ min: 5}).withMessage('Password must contain at least 5 characters')
        .trim()
        .escape(),
    body('password-confirm')
        .exists({checkFalsy: true}).withMessage('Password confirmations is required').bail()
        .custom((value, { req }) => value === req.body.password).withMessage('Passwords do not match').bail()
        .trim()
        .escape(),
    validateResults,
    createUser
]

export function login (req: Request, res: Response) {
    res.send('login test')
}

export function logout (req: Request, res: Response) {
    res.send('logout test')
}