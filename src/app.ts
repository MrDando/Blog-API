import express from 'express'

import userRouter from './routes/user.router'
import postRouter from './routes/post.router'


require('dotenv').config()

const PORT = process.env.PORT

const app = express()

// -------------- ROUTES ----------------

app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter)


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))