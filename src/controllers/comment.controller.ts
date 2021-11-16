import { Request, Response, NextFunction } from "express";

import ApiError from "../errors/APIError";
import { checkCommentIdValidity, checkPostIdValidity } from '../middleware/checkDBIdValidity'
import { authorizeUser, checkIfAuthorized } from '../middleware/userMiddleware'
import validateResults from '../middleware/validateResults'
import Comment from '../models/comment.model'
import Post from '../models/post.model'
import User from '../models/user.model'
import { createCommentValidationSchema, updateCommentValidationSchema } from '../schemas/comment.schemas'

export const getComments = [
    checkPostIdValidity,
    async function handleGetComment(req: Request, res: Response, next: NextFunction) {
        const postId = req.params.postid

        const post = await Post.findById(postId)
        const comments = await Comment.find({ post: postId })

        if (!post) { return next(ApiError.badRequest('Post with that ID does not exist'))}
        if (comments.length === 0) { return next(ApiError.notFound('Post does not have any comments'))}

        res.json({
            message: "Comments sent successfully",
            comments
        })
    }
]

export const createComment = [
    authorizeUser,
    (createCommentValidationSchema as any),
    validateResults,
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

        try {
            const newComment = await comment.save()
            res.status(201).json({
                message: 'Comment created successfully',
                comment: newComment
            })

        } catch (err) {
            return next (ApiError.internal('Internal server error'))
        }
    }
]

export const updateComment = [
    authorizeUser,
    (updateCommentValidationSchema as any),
    validateResults,
    checkPostIdValidity,
    checkCommentIdValidity,
    checkIfAuthorized('comment'),
    async function handleCommentUpdate (req: Request, res: Response, next: NextFunction) {
        const comment = res.locals.postOrComment
        if (!comment) { return next(ApiError.internal('Internal server error')) }

        req.body._id = comment._id
        const commentWithId = new Comment(req.body)

        try {
            const updatedComment = await Comment.findByIdAndUpdate(comment._id, commentWithId, { new: true })
            res.json({
                message: "Comment updated successfully", 
                comment: updatedComment
            })

        } catch (err) {
            return next(ApiError.internal('Internal server error'))
        }
    }
]

export const deleteComment = [
    authorizeUser,
    checkCommentIdValidity,
    checkIfAuthorized('comment'),
    function handleCommentDelete(req: Request, res: Response, next: NextFunction) {
        const comment = res.locals.postOrComment
        if (!comment) { return next(ApiError.internal('Internal server error')) }

        Comment.findByIdAndDelete(comment._id, {}, (err) => {
            if (err) { return next(ApiError.internal('Internal server error'))}

            res.json({
                message: "Comment deleted successfully"
            })
        })
    }
]