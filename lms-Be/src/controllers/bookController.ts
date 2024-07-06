import zod, { object } from 'zod'
import { Book } from '../models/bookModel';
    

const bookBody = zod.object({
    accessionNo: zod.string(),
    author: zod.string(),
    title: zod.string(),
    edition: zod.string().optional(),
    pages: zod.number().positive(),
    volume: zod.string().optional(),
    publisher: zod.string(),
    source: zod.string(),
    billdate: zod.string(),
    cost: zod.number().positive(),
    rackno: zod.string(),
    withdrawldate: zod.date().optional()
});

export const createBook = async (req:any, res:any) => {
  try {
    const result = bookBody.safeParse(req.body)
    console.log("RESult"+result)
    if(!result.success){
        return res.status(400).json({
            msg:"Invalid Input",
            errors: result.error.errors
        })
    }
        const newBook = new Book(result.data)
        console.log("NEW boooookd"+newBook)
        await newBook.save();

        return res.status(201).json({
            message:"Book created Successfullly",
            book:newBook
        })

  } catch (err) {
    res.status(500).json({
        message: "Server error",
        error: err
    });

  }}

export const getAllBook = async (req:any, res:any) => { 
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        const books = await Book.find().skip(skip).limit(parseInt(limit, 10));
        res.json(books);
    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err
        });
    
    }

}

export const getBook = async (req:any, res:any) => {
        try {
            const {id } = req.params;
                const book = await Book.findById(id)
                    if(!book) {
                        return res.status(404).json({
                            message:"Book not Found"
                        })
                    }
                    res.status(200).json(book)
        } catch (err) {
            res.status(500).json({
                message: "Server error",
                error: err
            });
        
            
        }
}

export const deleteBook = async (req:any, res:any) => {
    try {
            const {id} = req.params;
            const deletedBook = await Book.findByIdAndDelete(id);

            if(!deletedBook) {
                return res.status(404).json({
                    msg:"Book not found"
                })
            }
            return res.status(200).json({
                msg:"Book Deleted Successfully",
                book:deletedBook
            })
    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err
        });
        
    }
}

export const updateBook = async(req:any,res:any) =>{ 
    const {id} = req.params;
    const updates = req.body
    try {
            const book = await Book.findById(id)
            if(!book) {
                return res.status(404).json({msg:"Book not found"})
            }
            Object.assign(book, updates);
            await book.save()
            res.status(200).json({msg:"Book Updated Successfully",book})

    } catch (err) {
            return res.status(500).json({msg:"Server Error"})
    }
}