import mongoose  from "mongoose";

const bookSchema = new mongoose.Schema({
    accessionNo: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    title: { type: String, required: true },
    edition: { type: String, required: true },
    pages: { type: Number, required: true },
    volume: { type: String, required: true },
    publisher: { type: String, required: true },
    source: { type: String, required: true },
    billdate: { type: Date, required: true },
    cost: { type: Number, required: true },
    rackno: { type: String, required: true },
    withdrawldate: { type: Date } // Optional field
}, {
    timestamps: true
});


const Book = mongoose.model('Book', bookSchema)

export {
    Book
}