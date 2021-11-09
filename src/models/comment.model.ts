import mongoose, { Schema, Document} from 'mongoose'

interface IComment extends Document {
    text: string;
    author: any; // Add user object
    post: any; // Add post object
    isPublished: boolean;
}

const CommentSchema = new Schema<IComment>({
    text: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true},
    isPublished: { type: Boolean, required: true }},
    {
        timestamps: true,
    }
)

const Comment = mongoose.model('Comment',CommentSchema)

export default Comment