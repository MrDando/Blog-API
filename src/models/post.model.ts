import mongoose, { Schema, Document} from 'mongoose'

interface IPost extends Document {
    title: string;
    postLink: string;
    text: string;
    author: any; // Add user object
    isPublished: boolean;
}

const PostSchema = new Schema<IPost>({
    title: { type: String, required: true },
    postLink: { type: String },
    text: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    isPublished: { type: Boolean, required: true }},
    {
        timestamps: true,
    }
)

PostSchema.pre("save", function getTitleLink(next) {
    const post = this

    if (!post.isModified("title")) { return next() }

    const link = post.title.toLowerCase().replace(/\s/g, '-')
    post.postLink = link

    return next()
})

const Post = mongoose.model('Post', PostSchema)

export default Post
