import { Request, Response, NextFunction } from "express";

import ApiError from "../errors/APIError";
import { checkPostIdValidity } from '../middleware/checkDBIdValidity'
import { authorizeUser } from '../middleware/userMiddleware'
import Comment from '../models/comment.model'
import Post from '../models/post.model'
import User from '../models/user.model'

export function getComments(req: Request, res: Response) {
    res.send('Get comments not implemented')
}

export const createComment = [
    authorizeUser,
    checkPostIdValidity,
    async function handleCreateComment(req: Request, res: Response, next: NextFunction) {
        const JWTData = res.locals.JWT
        const postId = req.params.postid

        const user = await User.findOne({ username: JWTData.sub })
        const post = await Post.findById(postId)

        if (!user) { return next(ApiError.forbidden('Error validating token'))}
        if (!post) { return next(ApiError.badRequest('Post with that ID does not exist'))}

        const comment = new Comment({
            text: req.body.text,
            author: user.id,
            post: post.id,
        })

        comment.save((err: any) => {
            if (err) { return next (ApiError.internal('Internal server error')) }

            res.status(201).send('Comment created successfully')
        })
    }
]

export function editComment(req: Request, res: Response) {
    res.send('Edit comment not implemented')
}

export function deleteComment(req: Request, res: Response) {
    res.send('Delete comment not implemented')
}