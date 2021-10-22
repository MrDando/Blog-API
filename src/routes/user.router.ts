import express, { Request, Response } from 'express'
import * as userController from '../controllers/user.controller'

const router = express.Router();

router.get('/signup', (req: Request, res: Response) => {
    userController.signup(req, res)
})

router.get('/login', (req: Request, res: Response) => {
    userController.login(req, res)
})

router.get('/logout', (req: Request, res: Response) => {
    userController.logout(req, res)
})


export default router