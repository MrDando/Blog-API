import { Request, Response, NextFunction} from 'express'

import validateResults from '../middleware/validateResults'
import handleCreateUser from '../middleware/handleCreateUser'
import handleUserLogin from '../middleware/handleUserLogin'
import { signupValidationSchema, loginValidationSchema } from '../schemas/user.schemas'

export const signup = [
    (signupValidationSchema as any),
    validateResults,
    handleCreateUser
]

export const login = [
    (loginValidationSchema as any),
    validateResults,
    handleUserLogin
]