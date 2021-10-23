import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true,  minlength: 3, maxlength: 20 },
    hash: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    isCreator : { type: Boolean, required: true, default: false }
})

const User = mongoose.model('User', UserSchema)

export default User