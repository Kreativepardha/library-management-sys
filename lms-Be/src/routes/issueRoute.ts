import express from 'express'
import { isAdmin } from '../middlewares/auth'
import { issueBook } from '../controllers/issueController'

const router = express.Router()

router.post("/", isAdmin, issueBook)
// router.get("/", isAdmin, getAllIssued)
// router.get("/:id", isAdmin, getIssued)



export { router as issueRouter}