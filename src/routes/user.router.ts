import express, { Request, Response } from 'express'
import * as userController from '../controllers/user.controller'

const router = express.Router();

router.post('/signup', userController.signup)

router.post('/login', userController.login)

router.post('/logout', userController.logout)


export default router