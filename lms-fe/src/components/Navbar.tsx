import { Link, useNavigate } from "react-router-dom"
import { Button } from "./Button"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { FormEvent } from "react"



export const Navbar = () => {
    const navigate = useNavigate()

    const handleLogout = async (e: FormEvent) => {
        
        
        try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/auth/logout`)
            localStorage.removeItem("token")
            navigate("/")
        } catch (err) { 
            console.error(err);
            
        }

    }

    return (
        <nav  className="flex justify-between p-6 bg-sky-400  text-white border-b-2 border-black" style={{paddingInline: `45px` }}>
                <div className="flex items-center">
                    <Link to="/dashboard" className="mr-20 text-3xl font-extrabold"  >Library Management Statement</Link>
                </div>
                <div className="flex items-center font-bold space-x-1">
                        <Button size="lg" variant="ghost" onClick={() => navigate("/books") }>Books</Button>
                        <Button size="lg" variant="ghost" onClick={() => navigate("/addbook")}  >Add Book</Button>
                        <Button size="lg" variant="ghost" onClick={() => navigate("/students")}  >students</Button>
                        <Button  size="lg" variant="ghost" onClick={() => navigate("/register") } >Add students</Button>
                        <Button  size="lg" variant="ghost"  onClick={handleLogout} >Logout</Button>
                </div>
        </nav>
    )
}