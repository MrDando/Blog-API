import { Request, Response, NextFunction} from 'express'
import { body, validationResult } from 'express-validator'

import User from '../models/user.model'

export const signUpValidationSchema = [
    body('username')
        .exists({checkFalsy: true}).withMessage('Username is required').bail()
        .isAlphanumeric().withMessage('Username can only contain letters and numbers')
        .isLength({ min: 3}).withMessage('Username must contain at least 3 characters')
        .trim()
        .escape(),
    body('password')
        .exists({checkFalsy: true}).withMessage('Password is required').bail()
        .isAlphanumeric().withMessage('Password can only contain letters and numbers')
        .isLength({ min: 5}).withMessage('Password must contain at least 5 characters')
        .trim()
        .escape(),
]

export const ValidateResults = function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.status(400).json(errors.array())
        } else {
            next()
        }
}

export const createUser = function (req: Request, res: Response, next: NextFunction) {
    const user = new User({
        username: req.body.username,
        hash: req.body.password, // TODO Password hashing
    })

    user.save((err: Error) => {
        if (err) { return next (err) }

        res.status(201).send('User created successfully')
    })

    console.log(user)
}