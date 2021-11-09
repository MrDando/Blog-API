import express from 'express'
import * as postController from '../controllers/post.controller'
import * as commentController from '../controllers/comment.controller'
import { authorizeUser } from '../middleware/userMiddleware'

const router = express.Router();

router.get('/', postController.getPosts)

router.post('/', postController.createPost)

router.get('/:postid', postController.getSinglePost)

router.put('/:postid', postController.updatePost)

router.delete('/:postid', postController.deletePost)

router.get('/:postid/comments', commentController.getComments)

router.post('/:postid/comments', commentController.createComment)

router.put('/:postid/comments/:commentid', commentController.updateComment)

router.delete('/:postid/comments/:commentid', commentController.deleteComment)




export default router