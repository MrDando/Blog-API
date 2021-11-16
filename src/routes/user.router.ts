import express from 'express'
import * as userController from '../controllers/user.controller'

const router = express.Router();

router.post('/signup', userController.signup)

router.post('/login', userController.login)

router.get('/', userController.getUsers)

router.post('/', userController.changeUserRole)

router.post('/', userController.deleteUser)


export default router