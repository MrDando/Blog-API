import { Request, Response, NextFunction} from 'express'
import { validationResult } from 'express-validator'

export const validateResults = function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.status(400).json(errors.array())
        } else {
            next()
        }
}

export default validateResults