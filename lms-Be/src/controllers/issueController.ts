import { Book } from "../models/bookModel";
import { Issue } from "../models/issueModel";
import { User } from "../models/userModel";



export const issueBook = async (req:any,res:any) => {
    const { book_id, user_id  } = req.body;

        if(!book_id || !user_id){
            return res.status(401).json({
                msg:"Pleaze enter all fields"
            })
        }

            try {
                    const book = await Book.findOne({_id: book_id})
                    const user = await User.findOne({_id: user_id})
                    console.log(book)
                    console.log(user)
                    if(!book) return res.status(404).json({msg:"book not valid"})
                    if(!user) return res.status(404).json({msg:"user not valid"})


                        const issue = new Issue({
                            user: user._id,
                            book: book._id,
                        })
                        issue.save()
                        return res.status(200).json({
                            msg:"Book issued to the user"
                        })
                        
            } catch (err) {
                console.error(err)
                return res.status(500).json({msg:"Server Error"})
            }

}