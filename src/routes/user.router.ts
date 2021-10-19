import express from 'express'
import * as userController from '../controllers/user.controller'

const router = express.Router();

router.get('/signup', (req, res) => {
    userController.signup(req, res)
})

router.get('/login', (req, res) => {
    userController.login(req, res)
})

router.get('/logout', (req, res) => {
    userController.logout(req, res)
})


export default router