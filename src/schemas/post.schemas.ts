import { checkSchema } from 'express-validator'

import Post from '../models/post.model'

export const createPostValidationSchema = checkSchema({
    title: {
        in: ['body'],
        exists: {
            errorMessage: 'Post title is required',
            options: { checkFalsy: true },
            bail: true
        },
        isLength: {
            errorMessage: 'Post title must contain at least 3 characters',
            options: { min: 3 },
        },
        custom: {
            errorMessage: 'Post with that title already exists',
            options: ((title) => {
                return Post.findOne({ title: title }).then((post) => {
                    if (post) {
                        throw new Error('Post title is not available');
                    }
                })
            })
        },
        trim: {},
        escape: {}
    },
    text: {
        in: ['body'],
        exists: {
            errorMessage: 'Post body is required',
            options: { checkFalsy: true },
            bail: true
        },
        isLength: {
            errorMessage: 'Post body must contain at least 10 characters',
            options: { min: 10 },
        },
        trim: {},
        escape: {}
    },
    isPublished: {
        in: ['body'],
        exists: {
            errorMessage: 'isPublished is required',
            options: { checkNull: true },
            bail: true
        },
        isBoolean: {
            errorMessage: 'isPublished must be a boolean value',
        }
    }
})