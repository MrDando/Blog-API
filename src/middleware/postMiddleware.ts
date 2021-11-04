import { Request, Response, NextFunction } from 'express'

import User from '../models/user.model'
import Post from '../models/post.model'

export async function handleGetPosts(req: Request, res: Response, next: NextFunction) {

    // ------------ Currently returns all posts regardless of whether they are published or not ------------
    const posts = await Post.find().populate('author', 'username')
    res.send(posts)
}

export async function handleCreatePost (req: Request, res: Response, next: NextFunction) {
    const JWTData = res.locals.user
    const user = await User.findOne({ username: JWTData.sub })
    if (!user) { return res.status(403).json({ message: 'Error validating token' })}
    if (user && !user.isCreator) {
        return res.status(403).json({ message: 'User not authorized to create posts'});
    }
    if (user) {
        const post = new Post({
            title: req.body.title,
            text: req.body.text,
            author: user._id,
            isPublished: req.body.isPublished
        })

        post.save((err: any) => {
            if (err) { return next (err) }
    
            res.status(201).send('Post created successfully')
        })
    }
}