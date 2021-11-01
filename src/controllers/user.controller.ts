import { Request, Response, NextFunction} from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'

import User from '../models/user.model'
import validateResults from '../middleware/validateResults'
import createUser from '../middleware/createUser'
import { authenticateUser } from '../services/user.service'

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

export const login = [
    async function (req: Request, res: Response, next: NextFunction) {
        let { username, password } = req.body;
        let opts = {
            expiresIn: 60 * 60 * 24 * 365
        }
        const [ error, user, message ] = await authenticateUser(username, password)
        if (error) {
            next(error)
        } else {
            if (user) {
                const secret = process.env.ACCESS_TOKEN_SECRET
                if (typeof secret !== 'undefined') {
                    const token = jwt.sign({ username }, secret, opts);
                    return res.status(200).json({
                        message: "Auth Passed",
                        token
                    })
                }
            }
    
            return res.status(401).json({ message })
        }
    }
]

export function logout (req: Request, res: Response) {
    res.send('logout test')
}