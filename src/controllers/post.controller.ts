import { NextFunction, Request, Response } from "express";

import { createPostValidationSchema } from '../schemas/post.schemas'
import validateResults from '../middleware/validateResults'
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

export function updatePost(req: Request, res: Response) {
    res.send('Update post not implemented')
}

export function deletePost(req: Request, res: Response) {
    res.send('Delete post not implemented')
}