import validateResults from '../middleware/validateResults'
import { handleUserCreate, handleUserLogin } from '../middleware/userMiddleware'
import { signupValidationSchema, loginValidationSchema } from '../schemas/user.schemas'

export const signup = [
    (signupValidationSchema as any),
    validateResults,
    handleUserCreate
]

export const login = [
    (loginValidationSchema as any),
    validateResults,
    handleUserLogin
]