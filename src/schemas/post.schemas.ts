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
        trim: {},
        escape: {},
        isLength: {
            errorMessage: 'Post title must be between 3 and 50 characters long',
            options: { min: 3, max: 50 },
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
        }
    },
    text: {
        in: ['body'],
        exists: {
            errorMessage: 'Post body is required',
            options: { checkFalsy: true },
            bail: true
        },
        trim: {},
        escape: {},
        isLength: {
            errorMessage: 'Post body must contain at least 10 characters',
            options: { min: 10 },
        }
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

export const updatePostValidationSchema = checkSchema({
    title: {
        in: ['body'],
        optional: { options: { nullable: true } },
        trim: {},
        escape: {},
        isLength: {
            errorMessage: 'Post title must be between 3 and 50 characters long',
            options: { min: 3, max: 50 },
        }
    },
    text: {
        in: ['body'],
        optional: { options: { nullable: true } },
        trim: {},
        escape: {},
        isLength: {
            errorMessage: 'Post body must contain at least 10 characters',
            options: { min: 10 },
        }
    },
    isPublished: {
        in: ['body'],
        optional: { options: { nullable: true } },
        isBoolean: {
            errorMessage: 'isPublished must be a boolean value',
        }
    }
})