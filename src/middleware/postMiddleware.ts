import { Request, Response, NextFunction } from 'express'

import User from '../models/user.model'
import Post from '../models/post.model'
import ApiError from '../errors/APIError'

export async function handleGetPosts(req: Request, res: Response, next: NextFunction) {

    // ------------ Currently returns all posts regardless of whether they are published or not ------------
    const posts = await Post.find().populate('author', 'username')
    res.send(posts)
}

export async function handleGetSinglePost(req: Request, res: Response, next: NextFunction) {
        try {
            const post = await Post.findById(req.params.postid).populate('author', 'username')
            if (!post) { return next(ApiError.notFound('Post with that id does not exist'))}
            return res.send(post)
        } catch (err){
            return next (ApiError.internal('Internal server error'))
        }
}

export async function handleCreatePost (req: Request, res: Response, next: NextFunction) {
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

export function checkPostIdValidity(req: Request, res: Response, next: NextFunction) {
    const id = req.params.postid
    if (!id.match(/^[0-9a-fA-F]{24}$/)) { return next(ApiError.badRequest('Invalid post id')) }
    next()
}