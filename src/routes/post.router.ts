import express, { Request, Response } from 'express'
import * as postController from '../controllers/post.controller'
import * as commentController from '../controllers/comment.controller'

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    postController.getPosts(req, res)
})

router.post('/', (req: Request, res: Response) => {
    postController.createPost(req, res)
})

router.get('/:postid', (req: Request, res: Response) => {
    postController.getSinglePost(req, res)
})

router.put('/:postid', (req: Request, res: Response) => {
    postController.updatePost(req, res)
})

router.delete('/:postid', (req: Request, res: Response) => {
    postController.deletePost(req, res)
})

router.get('/:postid/comments', (req: Request, res: Response) => {
    commentController.getComments(req, res)
})

router.post('/:postid/comments', (req: Request, res: Response) => {
    commentController.createComment(req, res)
})

router.put('/:postid/comments/:commentid', (req: Request, res: Response) => {
    commentController.editComment(req, res)
})

router.delete('/:postid/comments/:commentid', (req: Request, res: Response) => {
    commentController.deleteComment(req, res)
})




export default router