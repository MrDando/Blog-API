import { Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

import User from '../models/user.model'
import authenticateUser from './utils/authenticateUser'
import extractJWT from './utils/extractJWT'

export const handleUserCreate = function (req: Request, res: Response, next: NextFunction) {

    const user = new User({
        username: req.body.username,
        password: req.body.password
    })
    
    user.save((err: any) => {
        if (err) { return next (err) }

        res.status(201).send('User created successfully')
    })
}

export async function handleUserLogin (req: Request, res: Response, next: NextFunction) {
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

export function authorizeUser(req: Request, res: Response, next: NextFunction) {
    const token = extractJWT(req)
    if (!token) {
       return res.status(401).json({ message: 'Please login to access this page'})
    }

    const secret = process.env.ACCESS_TOKEN_SECRET
    if (typeof secret !== 'undefined') {
        jwt.verify(token, secret, (err, authData) => {
            if(err) {
                return res.status(403).json({ message: 'Token is invalid'});
            }
            res.locals.user = authData
            next()
        })
    }
}