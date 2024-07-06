import { useState } from "react"
import { Button } from "./Button"


export const StudentCard = ({student}) => {
    const {name,email} = student
    const [issue,setIssue] = useState("")
    const [ret,setRet] = useState("")


        return <div className="bg-yellow-200 w-80 p-6 rounded-md text-nowrap shadow-lg shadow-slate-200 ">
            <p><strong>ID:</strong> {student._id}</p>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Email:</strong> {student.email}</p>
           <div className="flex justify-evenly mt-3 mb-0 p-0">
            <Button variant="outline" >Issue</Button>
            <Button variant="destructive">return</Button>
           </div>
    </div>
}