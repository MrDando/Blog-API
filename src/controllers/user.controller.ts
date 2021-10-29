import { NextFunction, Request, Response } from "express"
import { body, validationResult } from 'express-validator'

export const signup = [
    body('username')
    .exists({checkFalsy: true}).withMessage('Username is required')
    .isAlphanumeric().withMessage('Username can only contain letters and numbers')
    .isLength({ min: 3}).withMessage('Username must contain at least 3 characters')
    .trim()
    .escape(),
    body('password')
    .exists({checkFalsy: true}).withMessage('Password is required')
    .isAlphanumeric().withMessage('Password can only contain letters and numbers')
    .isLength({ min: 5}).withMessage('Password must contain at least 5 characters')
    .trim()
    .escape(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req)
        console.log(errors.array())

        if (!errors.isEmpty()) {
            res.json(errors.array())
        } else {
            res.send('All ok')
        }
    }
]

export function login (req: Request, res: Response) {
    res.send('login test')
}

export function logout (req: Request, res: Response) {
    res.send('logout test')
}