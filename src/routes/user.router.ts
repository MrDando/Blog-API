import express, { Request, Response } from 'express'
import * as userController from '../controllers/user.controller'

const router = express.Router();

router.get('/signup', userController.signup)

router.get('/login', userController.login)

router.get('/logout', userController.logout)


export default router