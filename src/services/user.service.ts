import User from '../models/user.model'

export async function authenticateUser(username: string, inputPassword: string) {
    try {
        const user = await User.findOne({ username })

        if (!user) {
            return [null, false, { message: 'Incorrect username'}]
        }
        const validPassword = await user.comparePassword(inputPassword)
    
        if (!validPassword) {
            return [null, false, { message: 'Incorrect password.' }]
        } else {
            return [null, user];
        }

    } catch (error: any) {
        return [error, false, { message: 'Server error while connecting to database'}]
    }
}