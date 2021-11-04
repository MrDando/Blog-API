import { NextFunction, Request, Response } from "express";
import { body } from 'express-validator'

import Post from '../models/post.model'
import validateResults from '../middleware/validateResults'
import handleCreatePost from '../middleware/handleCreatePost'

export function getPosts(req: Request, res: Response) {
    res.send('Get Posts not implemented')
}
export function getSinglePost(req: Request, res: Response) {
    res.send('Get single post not implemented')
}

export const createPost = [
    body('title')
        .exists({checkFalsy: true}).withMessage('Post title is required').bail()
        .isLength({ min: 3}).withMessage('Post title must contain at least 3 characters')
        .custom((title) => {
            return Post.findOne({ title: title }).then((title) => {
                if (title) {
                    throw new Error('Post with that title already exists');
                }
            })
        }).withMessage('Post with that title already exists')
        .trim()
        .escape(),
    body('text')
        .exists({checkFalsy: true}).withMessage('Post text is required').bail()
        .isLength({ min: 10}).withMessage('Body of a post must contain at least 10 characters')
        .trim()
        .escape(),
    body('isPublished')
        .isBoolean().withMessage('isPublished must be a boolean value')
        .trim()
        .escape(),
    validateResults,
    handleCreatePost
]

export function updatePost(req: Request, res: Response) {
    res.send('Update post not implemented')
}

export function deletePost(req: Request, res: Response) {
    res.send('Delete post not implemented')
}