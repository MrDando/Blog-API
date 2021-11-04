import express from 'express'
import * as postController from '../controllers/post.controller'
import * as commentController from '../controllers/comment.controller'
import { authorizeUser } from '../middleware/userMiddleware'

const router = express.Router();

router.get('/', postController.getPosts)

router.post('/', authorizeUser, postController.createPost)

router.get('/:postid', postController.getSinglePost)

router.put('/:postid', authorizeUser, postController.updatePost)

router.delete('/:postid', authorizeUser, postController.deletePost)

router.get('/:postid/comments', commentController.getComments)

router.post('/:postid/comments', authorizeUser, commentController.createComment)

router.put('/:postid/comments/:commentid', authorizeUser, commentController.editComment)

router.delete('/:postid/comments/:commentid', authorizeUser, commentController.deleteComment)




export default router