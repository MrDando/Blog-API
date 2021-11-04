import { Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

import validateResults from '../middleware/validateResults'
import handleCreateUser from '../middleware/handleCreateUser'
import { authenticateUser } from '../services/user.service'
import { signupValidationSchema } from '../schemas/user.schemas'

export const signup = [
    (signupValidationSchema as any),
    validateResults,
    handleCreateUser
]

export const login = [
    async function (req: Request, res: Response, next: NextFunction) {
        let { username, password } = req.body;
        let opts = {
            expiresIn: "7d"
        }
        const [ error, user, message ] = await authenticateUser(username, password)
        if (error) {
            next(error)
        } else {
            if (user) {
                const userJWTData = {
                    sub: user.username,
                    admn: user.isAdmin,
                    crtr: user.isCreator
                }
                const secret = process.env.ACCESS_TOKEN_SECRET
                if (typeof secret !== 'undefined') {
                    const token = jwt.sign( userJWTData, secret, opts);
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