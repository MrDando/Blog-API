import { Request, Response, NextFunction} from 'express'
import bcryptjs from 'bcryptjs'

import User from '../models/user.model'

const createUser = function (req: Request, res: Response, next: NextFunction) {
    const hash = bcryptjs.hashSync(req.body.password, 12)

    const user = new User({
        username: req.body.username,
        hash: hash,
    })
    
    user.save((err: Error) => {
        if (err) { return next (err) }

        res.status(201).send('User created successfully')
    })
}

export default createUser 