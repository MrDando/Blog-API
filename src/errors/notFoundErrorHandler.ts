import { Request, Response, NextFunction} from 'express'
import ApiError from './APIError'

export default function  notFoundErrorHandler(req: Request, res: Response, next: NextFunction) {
    next(ApiError.notFound('The resource you are looking for does not exist'));
}