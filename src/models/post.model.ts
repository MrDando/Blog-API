import mongoose, { Schema, Document} from 'mongoose'

interface IPost extends Document {
    title: string;
    text: string;
    author: any; // Add user object
    isPublished: boolean;
}

const PostSchema = new Schema<IPost>({
    title: { type: String, required: true },
    text: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    isPublished: { type: Boolean, required: true }},
    {
        timestamps: true,
    }
)

const Post = mongoose.model('Post', PostSchema)

export default Post
