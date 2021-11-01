import { Request, Response, NextFunction} from 'express'

import User from '../models/user.model'

const createUser = function (req: Request, res: Response, next: NextFunction) {

    const user = new User({
        username: req.body.username,
        password: req.body.password
    })
    
    user.save((err: any) => {
        if (err) { return next (err) }

        res.status(201).send('User created successfully')
    })
}

export default createUser 