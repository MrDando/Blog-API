import { Request, Response, NextFunction} from 'express'
import ApiError from './APIError'

function apiErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  // in prod, don't use console.log or console.err because
  // it is not async
  console.error(err);

  if (!(err instanceof ApiError)) {
    return res.status(500).json('something went wrong');
  }

  res.status(err.code).json(err.message)

}

export default apiErrorHandler