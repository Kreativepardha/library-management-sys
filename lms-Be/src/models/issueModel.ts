import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
        book: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"book"
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"user"
        }

})


const Issue = mongoose.model('Issue', issueSchema)

export {
    Issue
}