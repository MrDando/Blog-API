import { Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

import extractJWT from './utils/extractJWT'
import ApiError from '../errors/APIError'
import User from '../models/user.model'
import Post from '../models/post.model'

export function authorizeUser(req: Request, res: Response, next: NextFunction) {
    const token = extractJWT(req)
    if (!token) {
        return next(ApiError.unauthorized('Please login to access this page'))
    }

    const secret = process.env.ACCESS_TOKEN_SECRET
    if (typeof secret !== 'undefined') {
        jwt.verify(token, secret, (err, authData) => {
            if(err) {
                return next(ApiError.forbidden('Token is invalid'))
            }
            res.locals.JWT = authData
            next()
        })
    }
}

export function checkIfAuthorized (objectType: "Post" | "Comment") {
    return async function (req: Request, res: Response, next: NextFunction) {
        const JWTData = res.locals.JWT
        try {
            const user = await User.findOne({ username: JWTData.sub })
            let postOrComment
            if (objectType = "Post") {
                postOrComment = await Post.findById(req.params.postid).populate('author', 'username')
            }
            if (objectType = "Comment") {

                // Currently does the same thing as post. Needs to be updated when Comment model is created.
                postOrComment = await Post.findById(req.params.postid).populate('author', 'username')
            }
            if (!user) { return next(ApiError.forbidden('Error validating token'))}
            if (!postOrComment) { return next(ApiError.notFound('Post with that id does not exist'))}
    
            const authorId = postOrComment.author._id.toString()
            const userId = user._id.toString()
            if (!(user.isAdmin || userId === authorId)) { return next(ApiError.forbidden('You are not authorized to update this post'))}
            res.locals.user = user
            res.locals.postOrComment = postOrComment
            next()
        } catch (err) {
            return next(ApiError.internal('Internal server error'))
        }
    }
}