import { Request, Response } from 'express';
import { Book } from '../models/bookModel';
import { Student } from '../models/studentModel';
import { Issue , IssueDocument} from '../models/issueModel';


// export const returnBook = async (req: Request, res: Response) => {
//     const { id } = req.params;

//     if (!id) {
//         return res.status(400).json({ msg: "ID not provided" });
//     }

//     try {
//         const issue = await Issue.findById(id);

//         if (!issue) {
//             return res.status(404).json({ msg: "Issue not found" });
//         }

//         // Update returned status
//         issue.returned = true;
//         await issue.save();

//         return res.status(200).json({
//             msg: "Book returned successfully",
//             issue
//         });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ msg: 'Server Error' });
//     }
// };

export const issueBook = async (req: Request, res: Response) => {
    const { book_id, student_id, issuedDate } = req.body;

    if (!book_id || !student_id || !issuedDate) {
        return res.status(400).json({
            msg: "Please enter all fields"
        });
    }
    try {
        const book = await Book.findById(book_id);
        const student = await Student.findById(student_id);

        if (!book) {
            return res.status(404).json({ msg: "Book not valid" });
        }

        if (!student) {
            return res.status(404).json({ msg: "Student not valid" });
        }
        const existingIssue = await Issue.findOne({ book: book._id, returned: false });
        
        if (existingIssue) {
            return res.status(400).json({ msg: "Book is already issued" });
        }

        const issue = new Issue({
            student: student._id,
            book: book._id,
            issuedDate: new Date(issuedDate)
        });

        await issue.save();
    
        await Student.findByIdAndUpdate(student._id, {
            $push: { issuedBooks: issue._id }
        });
    
        return res.status(200).json({
            msg: "Book issued to the student",
            issue
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server Error" });
    }
};

export const getAllIssuedBooks = async (req: Request, res: Response) => {
    try {
        const issues = await Issue.find().populate('book').populate('student');
        return res.status(200).json(issues);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server Error" });
    }
};

export const getIssuedBookById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const issue = await Issue.findById(id).populate('book').populate('student');
        if (!issue) {
            return res.status(404).json({ msg: "Issue not found" });
        }
        return res.status(200).json(issue);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server Error" });
    }
};



export const returnBook = async (req: Request, res: Response) => {
    const { id } = req.params; 

    try {
        if (!id) {
            return res.status(400).json({ msg: "ID not provided" });
        }
        const issue = await Issue.findById(id);
        if (!issue) {
            return res.status(404).json({ msg: "Issue not found" });
        }
        issue.returned = true;
        await issue.save();
        await Student.findByIdAndUpdate(issue.student, {
            $pull: { issuedBooks: issue._id }
        });
        return res.status(200).json({ msg: "Book returned successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server Error" });
    }
};



export const getReturnedBooks = async (req: Request, res: Response) => {
    try {
        const returnedBooks = await Issue.find({ returned: true })
            .populate('book')
            .populate('student');

        return res.status(200).json(returnedBooks);
    } catch (err) {
        console.error('Error fetching returned books:', err); 
        return res.status(500).json({ msg: 'Server Error' });
    }
};
