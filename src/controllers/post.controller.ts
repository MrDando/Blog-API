import { NextFunction, request, Request, Response } from "express";

import ApiError from "../errors/APIError";
import { checkPostIdValidity } from '../middleware/postMiddleware'
import { authorizeUser, checkIfAuthorized } from '../middleware/userMiddleware'
import validateResults from '../middleware/validateResults'
import User from '../models/user.model'
import Post from '../models/post.model'
import { createPostValidationSchema, updatePostValidationSchema } from '../schemas/post.schemas'

export const getPosts = [
    async function handleGetPosts(req: Request, res: Response, next: NextFunction) {

    // ------------ Currently returns all posts regardless of whether they are published or not ------------
    const posts = await Post.find().populate('author', 'username')
    res.send(posts)
    }
]

export const getSinglePost = [
    checkPostIdValidity,
    async function handleGetSinglePost(req: Request, res: Response, next: NextFunction) {
        try {
            const post = await Post.findById(req.params.postid).populate('author', 'username')
            if (!post) { return next(ApiError.notFound('Post with that id does not exist'))}
            return res.send(post)
        } catch (err){
            return next (ApiError.internal('Internal server error'))
        }
    }
]

export const createPost = [
    authorizeUser,
    (createPostValidationSchema as any),
    validateResults,
    async function handleCreatePost (req: Request, res: Response, next: NextFunction) {
        const JWTData = res.locals.JWT
        const user = await User.findOne({ username: JWTData.sub })
        if (!user) { return next(ApiError.forbidden('Error validating token'))}
        if (!user.isCreator) { return next(ApiError.forbidden('User not authorized to create posts'))}
        
        const post = new Post({
            title: req.body.title,
            text: req.body.text,
            author: user._id,
            isPublished: req.body.isPublished
        })
    
        post.save((err: any) => {
            if (err) { return next (ApiError.internal('Internal server error')) }
    
            res.status(201).send('Post created successfully')
        })
    }
]

export const updatePost = [
    authorizeUser,
    (updatePostValidationSchema as any),
    validateResults,
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