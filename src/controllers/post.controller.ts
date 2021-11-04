import { NextFunction, Request, Response } from "express";

import { createPostValidationSchema } from '../schemas/post.schemas'
import validateResults from '../middleware/validateResults'
import handleCreatePost from '../middleware/handleCreatePost'

export function getPosts(req: Request, res: Response) {
    res.send('Get Posts not implemented')
}
export function getSinglePost(req: Request, res: Response) {
    res.send('Get single post not implemented')
}

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