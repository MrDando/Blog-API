import { NextFunction, Request, Response } from "express"

import { signUpValidationSchema, ValidateResults } from '../services/user.service'

export const signup = [
    ...signUpValidationSchema,
    ValidateResults
]

export function login (req: Request, res: Response) {
    res.send('login test')
}

export function logout (req: Request, res: Response) {
    res.send('logout test')
}