import express from 'express'
import { userRouter } from './userRouter'
import { bookRouter } from './bookRouter'
import { issueRouter } from './issueRoute'

const router = express.Router()

router.use("/user",userRouter)
router.use("/book",bookRouter)
router.use("/issue",issueRouter)

export {router as mainRouter}