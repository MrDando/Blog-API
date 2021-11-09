import { Request, Response, NextFunction } from 'express'

import ApiError from '../errors/APIError'

export function checkPostIdValidity(req: Request, res: Response, next: NextFunction) {
    const id = req.params.postid
    if (!id.match(/^[0-9a-fA-F]{24}$/)) { return next(ApiError.badRequest('Invalid post id')) }
    next()
}

export function checkCommentIdValidity(req: Request, res: Response, next: NextFunction) {
    const id = req.params.commentid
    if (!id.match(/^[0-9a-fA-F]{24}$/)) { return next(ApiError.badRequest('Invalid comment id')) }
    next()
}