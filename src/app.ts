import express from 'express'
import mongoose from 'mongoose'

import userRouter from './routes/user.router'
import postRouter from './routes/post.router'
import notFoundErrorHandler from './errors/notFoundErrorHandler'
import apiErrorHandler from './errors/APIErrorHandler'


require('dotenv').config()

const PORT = process.env.PORT

const app = express()

app.use(express.json())

// -------------- DATABASE ----------------

const dbURL = process.env.DB_STRING;

if (typeof dbURL === 'string') {
    mongoose.connect(dbURL)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((err) => {
        console.log(err)
    })
}


// -------------- ROUTES ----------------

app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter)

// -------------- ERROR HANDLERS ----------------

app.use(notFoundErrorHandler)
app.use(apiErrorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))