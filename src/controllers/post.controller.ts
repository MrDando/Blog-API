import { NextFunction, request, Request, Response } from "express";

import ApiError from "../errors/APIError";
import { checkPostIdValidity } from '../middleware/checkDBIdValidity'
import { authorizeUser, checkIfAuthorized } from '../middleware/userMiddleware'
import validateResults from '../middleware/validateResults'
import User from '../models/user.model'
import Post from '../models/post.model'
import { createPostValidationSchema, updatePostValidationSchema } from '../schemas/post.schemas'

export const getPosts = [
    async function handleGetPosts(req: Request, res: Response, next: NextFunction) {

        // ------------ Currently returns all posts regardless of whether they are published or not ------------
        const posts = await Post.find().populate('author', 'username')
        res.json({
            message: "Posts sent successfully", 
            posts
        })
    }
]

export const getSinglePost = [
    checkPostIdValidity,
    async function handleGetSinglePost(req: Request, res: Response, next: NextFunction) {
        try {
            const post = await Post.findById(req.params.postid).populate('author', 'username')
            if (!post) { return next(ApiError.notFound('Post with that id does not exist'))}
            return res.json({
                message: "Post sent successfully", 
                post
            })
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
        
        try {
            const newPost = await post.save()

            res.status(201).json({
                message: "Post created successfully", 
                post: newPost })

        } catch (err) {
            return next (ApiError.internal('Internal server error'))
        }
    }
]

export const updatePost = [
    authorizeUser,
    (updatePostValidationSchema as any),
    validateResults,
    checkPostIdValidity,
    checkIfAuthorized('post'),
    async function handlePostUpdate(req: Request, res: Response, next: NextFunction) {
        const user = res.locals.user
        const post = res.locals.postOrComment
        if (!user || !post) { return next(ApiError.internal('Internal server error')) }

        req.body._id = post._id
        const postWithId = new Post(req.body)

        try {
            const updatedPost = await Post.findByIdAndUpdate(post._id, postWithId, { new: true })

            res.json({
                message: "Post updated successfully", 
                post: updatedPost
            })

        } catch (err) {
            return next(ApiError.internal('Internal server error'))
        }
    }
]

export const deletePost = [
    authorizeUser,
    checkPostIdValidity,
    checkIfAuthorized('post'),
    function handlePostDelete(req: Request, res: Response, next: NextFunction) {
        const post = res.locals.postOrComment
        if (!post) { return next(ApiError.internal('Internal server error')) }

        Post.findByIdAndDelete(post._id, {}, (err) => {
            if (err) { return next(ApiError.internal('Internal server error')) }

            res.send('Post deleted successfully')
        })
    }
]