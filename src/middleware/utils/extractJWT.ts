import { Request } from 'express'

function extractToken(req: Request) {

    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        const token = bearerToken;

        return token
    } else {
        return
    }
}

export default extractToken