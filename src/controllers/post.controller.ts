import { NextFunction, request, Request, Response } from "express";

import { createPostValidationSchema } from '../schemas/post.schemas'
import validateResults from '../middleware/validateResults'
import { checkIfAuthorized } from '../middleware/userMiddleware'
import { checkPostIdValidity, handleGetPosts, handleCreatePost, handleGetSinglePost } from '../middleware/postMiddleware'

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
    (req: Request, res: Response) => {
        res.send('Auth ok!')
    }
]

export function deletePost(req: Request, res: Response) {
    res.send('Delete post not implemented')
}