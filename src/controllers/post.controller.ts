import { NextFunction, request, Request, Response } from "express";

import { createPostValidationSchema } from '../schemas/post.schemas'
import validateResults from '../middleware/validateResults'
import { checkIfAuthorized } from '../middleware/userMiddleware'
import { checkPostIdValidity, handleGetPosts, handleCreatePost, handleGetSinglePost } from '../middleware/postMiddleware'
import ApiError from "../errors/APIError";

import Post from '../models/post.model'

export const getPosts = [
    handleGetPosts
]
export const getSinglePost = [
    checkPostIdValidity,
    handleGetSinglePost
]
export const createPost = [
    (createPostValidationSchema as any),
    validateResults,
    handleCreatePost
]

export const updatePost = [
    checkPostIdValidity,
    checkIfAuthorized('Post'),
    function handlePostUpdate(req: Request, res: Response, next: NextFunction) {
        const user = res.locals.user
        const post = res.locals.postOrComment
        if (!user || !post) { return next(ApiError.internal('Internal server error')) }

        req.body._id = post._id
        const updatedPost = new Post(req.body)

        Post.findByIdAndUpdate(post._id, updatedPost, {}, (err) => {
            if (err) { return next(ApiError.internal('Internal server error')) }

            res.send('Post updated successfully')
        })
    }
]

export function deletePost(req: Request, res: Response) {
    res.send('Delete post not implemented')
}