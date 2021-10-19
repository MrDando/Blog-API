import express from 'express'
import * as postController from '../controllers/post.controller'
import * as commentController from '../controllers/comment.controller'

const router = express.Router();

router.get('/', (req, res) => {
    postController.getPosts(req, res)
})

router.post('/', (req, res) => {
    postController.createPost(req, res)
})

router.get('/:postid', (req, res) => {
    postController.getSinglePost(req, res)
})

router.put('/:postid', (req, res) => {
    postController.updatePost(req, res)
})

router.delete('/:postid', (req, res) => {
    postController.deletePost(req, res)
})

router.get('/:postid/comments', (req, res) => {
    commentController.getComments(req, res)
})

router.post('/:postid/comments', (req, res) => {
    commentController.createComment(req, res)
})

router.put('/:postid/comments/:commentid', (req, res) => {
    commentController.editComment(req, res)
})

router.delete('/:postid/comments/:commentid', (req, res) => {
    commentController.deleteComment(req, res)
})




export default router