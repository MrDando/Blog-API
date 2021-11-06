import { Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

import ApiError from '../errors/APIError'
import validateResults from '../middleware/validateResults'
import authenticateUser from '../middleware/utils/authenticateUser'
import User from '../models/user.model'
import { signupValidationSchema, loginValidationSchema } from '../schemas/user.schemas'

export const signup = [
    (signupValidationSchema as any),
    validateResults,
    function handleUserSignup (req: Request, res: Response, next: NextFunction) {

        const user = new User({
            username: req.body.username,
            password: req.body.password
        })
        
        user.save((err: any) => {
            if (err) { return next (ApiError.internal('Internal server error')) }
    
            res.status(201).send('User created successfully')
        })
    }
]

export const login = [
    (loginValidationSchema as any),
    validateResults,
    async function handleUserLogin (req: Request, res: Response, next: NextFunction) {
        let { username, password } = req.body;
    
        const [ error, user, message ] = await authenticateUser(username, password)
        if (error) { return next(error) } 
        if (user) {
            const userJWTData = {
                sub: user.username,
            }
            const secret = process.env.ACCESS_TOKEN_SECRET
            if (typeof secret !== 'undefined') {
                const opts = {
                    expiresIn: "7d"
                }
                const token = jwt.sign( userJWTData, secret, opts);
                return res.status(200).json({
                    message: "Auth Passed",
                    token
                })
            }
        }
    
        return res.status(401).json({ message })
    }
]