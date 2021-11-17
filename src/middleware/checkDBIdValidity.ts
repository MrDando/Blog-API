import { Request, Response, NextFunction } from 'express'

import ApiError from '../errors/APIError'

export default function checkIdValidity(type: 'post' | 'comment' | 'user') {
    return function (req: Request, res: Response, next: NextFunction) {
        const idParam = `${type}id`
        const id = req.params[idParam]

        if (!id.match(/^[0-9a-fA-F]{24}$/)) { return next(ApiError.badRequest(`Invalid ${type} id`)) }
        next()  
    }
}