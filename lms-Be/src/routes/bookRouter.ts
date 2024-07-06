import express from 'express'
import { isAdmin, isAuthenticated } from '../middlewares/auth'
import { createBook, deleteBook, getAllBook, getBook, updateBook } from '../controllers/bookController'

const router = express.Router()

router.get("/",isAuthenticated,getAllBook)
router.post("/",isAdmin,createBook)
router.get("/:id", getBook)
router.delete("/:id",isAdmin,deleteBook)
router.put("/:id",isAdmin,updateBook)

export {router as bookRouter}