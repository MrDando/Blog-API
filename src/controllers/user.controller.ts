import { Request, Response } from "express"

export function signup (req: Request, res: Response) {
    res.send('signup test')
}

export function login (req: Request, res: Response) {
    res.send('login test')
}

export function logout (req: Request, res: Response) {
    res.send('logout test')
}