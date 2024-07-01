import express from 'express'
import { userRouter } from './userRouter'
import { bookRouter } from './bookRouter'
import { issueRouter } from './issueRoute'
import { authRouter } from './authRoute'

const router = express.Router()

router.use("/user",userRouter)
router.use("/book",bookRouter)
router.use("/issue",issueRouter)
router.use("/auth",authRouter)


export {router as mainRouter}