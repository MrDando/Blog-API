import mongoose, { Schema, Document} from 'mongoose'
import bcryptjs from 'bcryptjs'

interface IUser extends Document {
  username: string;
  password: string;
  isAdmin: boolean;
  isCreator: boolean;
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
    username: { type: String, required: true, unique: true,  minlength: 3, maxlength: 20 },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    isCreator : { type: Boolean, required: true, default: false }
})

UserSchema.pre("save", async function(next) {
    const user = this;

    if (!user.isModified("password")) {
        return next();
    }
    
    const hash = bcryptjs.hashSync(user.password, 12)
    user.password = hash;
    return next()
});

const User = mongoose.model<IUser>('User', UserSchema)

export default User