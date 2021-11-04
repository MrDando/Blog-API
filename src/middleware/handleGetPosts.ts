import { Request, Response, NextFunction } from 'express'

import Post from '../models/post.model'

export default async function handleGetPosts(req: Request, res: Response, next: NextFunction) {

    // ------------ Currently returns all posts regardless of whether they are published or not ------------
    const posts = await Post.find().populate('author', 'username')
    res.send(posts)
}