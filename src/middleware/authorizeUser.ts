import { Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

export default function authorizeUser(req: Request, res: Response, next: NextFunction) {
    const token = extractToken(req)

    if (!token) {
        res.status(401).json({ message: 'Please login to access this page'})
    } else {
        const secret = process.env.ACCESS_TOKEN_SECRET
        if (typeof secret !== 'undefined') {
            jwt.verify(token, secret, (err, authData) => {
                if(err) {
                  res.status(403).json({ message: 'Token is invalid'});
                } else {
                    res.locals.user = authData
                    next()
                }
            })
        }
    }
}

function extractToken(req: Request) {

    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        const token = bearerToken;

        return token
    } else {
        return
    }
}