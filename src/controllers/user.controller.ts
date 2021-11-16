import { Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

import ApiError from '../errors/APIError'
import { authenticateUser } from '../middleware/userMiddleware'
import validateResults from '../middleware/validateResults'
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
    
            res.status(201).json({
                message: "User created successfully"
            })
        })
    }
]

export const login = [
    (loginValidationSchema as any),
    validateResults,
    authenticateUser,
    function handleUserLogin (req: Request, res: Response, next: NextFunction) {
        const user = res.locals.user

        if (!user) { return next(ApiError.internal('Internal server error')) }
    
        const userJWTData = {
            sub: user.username,
        }
        const secret = process.env.ACCESS_TOKEN_SECRET
        if (!secret) { return next(ApiError.internal('Internal server error')) }
        
        const opts = {
            expiresIn: "7d"
        }
        const token = jwt.sign( userJWTData, secret, opts);
        
        return res.status(200).json({
            message: "User logged in successfully", 
            token })
    }
]