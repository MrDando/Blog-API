import { Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

import ApiError from '../errors/APIError'
import checkIdValidity from '../middleware/checkDBIdValidity'
import { authenticateUser, authorizeUser, checkIfAdmin } from '../middleware/userMiddleware'
import validateResults from '../middleware/validateResults'
import User from '../models/user.model'
import { signupValidationSchema, loginValidationSchema, updateRolesSchema } from '../schemas/user.schemas'

export const signup = [
    (signupValidationSchema as any),
    validateResults,
    async function handleUserSignup (req: Request, res: Response, next: NextFunction) {

        const user = new User({
            username: req.body.username,
            password: req.body.password
        })

        try {
            const newUser = await user.save()

            res.status(201).json({
                message: "User created successfully",
                userId: newUser._id
            })

        } catch (err) {
            return next (ApiError.internal('Internal server error'))
        }
    }
]

export const login = [
    (loginValidationSchema as any),
    validateResults,
    authenticateUser,
    function handleUserLogin (req: Request, res: Response, next: NextFunction) {
        const user = res.locals.user

        if (!user) { return next(ApiError.internal('Internal server error')) }
    
        const userJWTData = {
            sub: user.username,
        }
        const secret = process.env.ACCESS_TOKEN_SECRET
        if (!secret) { return next(ApiError.internal('Internal server error')) }
        
        const opts = {
            expiresIn: "7d"
        }
        const token = jwt.sign( userJWTData, secret, opts);
        
        return res.status(200).json({
            message: "User logged in successfully", 
            token })
    }
]

export const getUsers = [
    authorizeUser,
    checkIfAdmin,
    async function handleGetUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await User.find()

            res.json({
                message: "Users sent successfully",
                users
            })

        } catch (err) {
            return next(ApiError.internal('Internal server error'))
        }
    }
]

export const changeUserRole = [
    authorizeUser,
    checkIfAdmin,
    (updateRolesSchema as any),
    validateResults,
    async function handleChangeUserRole(req: Request, res: Response, next: NextFunction) {
        const newRole = req.body
        const userId = req.params.userid

        try {
            const updatedUser = await User.findByIdAndUpdate(userId, newRole, { new: true })

            if (!updatedUser) { return next(ApiError.notFound('User with that Id does not exist'))}

            res.json({
                message: "User role changed successfully",
                user: updatedUser
            })

        } catch (err) {
            return next(ApiError.internal('Internal server error'))
        }
    }
]

export const deleteUser = [
    authorizeUser,
    checkIfAdmin, // Currently only admin can delete users
    checkIdValidity('user'),
    async function handleDeleteUser(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.userid

        try {
            const user = await User.findByIdAndDelete(userId)

            if(!user) { return next(ApiError.badRequest('User with that Id does not exist'))}

            res.json({
                message: "User deleted successfully",
                user
            })

        } catch (err) {
            console.log(err)
            return next(ApiError.internal('Internal server error'))
        }
    }
]