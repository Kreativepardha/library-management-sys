import { FormEvent, useState } from "react"
import Input from "../components/Input"
import axios from "axios"
import { BACKEND_URL } from "../config"



export const AddBook = () => {
    const [accessionNo,setAccessionNo] = useState("")
    const [author,setAuthor] =  useState("")
    const [edition,setEdition] = useState("")
    const [title,setTitle] = useState("")
    const [pages,setPages] = useState("")
    const [volume,setVolume] = useState("")
    const [publisher,setPublisher] = useState("")
    const [source,setSource] = useState("")
    const [billdate,setBilldate] = useState("")
    const [cost,setCost] = useState("")
    const [rack,setRack] = useState("")

    // const navigate = useNavigate()


    const handleSubmit = async (e:FormEvent) => {
      e.preventDefault();
        try {
          const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjdhZThiN2QyZjY1MDNmZWI0OWYwNjIiLCJpYXQiOjE3MTkzMzA5OTl9.x8_NIYNBP6-GN-wYPmkT0nKfe_sgj-_UeSNAJ1ldU-E";
            const response = await axios.post(`${BACKEND_URL}/api/v1/book`,{
              accessionNo,author,edition,title,pages,volume,publisher,source,billdate,cost,rack
            },{
              headers: {
                Authorization: `${token}`,
              },
            })
            console.log(response)
            console.log(response.data)
        } catch (err) {
          console.error(err);
          // setError("An error occurred during registration. Please try again.");
        }
    }
    return <div  className="h-screen w-full flex justify-center items-center" >

  <form onSubmit={handleSubmit} className="w-92 border-t-2  shadow-lg rounded-lg  absolute" >
    <h1 className="font-extrabold text-center mt-4 text-slate-900 "  >Add Book</h1>
    <div className=" grid grid-cols-2 m-4">

          <Input 
            label="Accession no"
            name="123"
            value={accessionNo}
            onChange={(e) => setAccessionNo(e.target.value)}
            placeholder="Enter AccessionNO"
            type="text"
            />

            <Input 
            label="Author"
            name="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="John Doe"
            type="text"
          />

       <Input 
            label="Edition"
            name="edition"
            value={edition}
            onChange={(e) => setEdition(e.target.value)}
            placeholder="Enter edition"
            type="text"
            />
           <Input 
            label="Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            type="text"
            />
           <Input 
            label="Pages"
            name="pages"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            placeholder="230"
            type="text"
            />

           <Input 
            label="Volume"
            name="volume"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            placeholder="Enter volume"
            type="text"
            />
           <Input 
            label="publisher"
            name="publisher"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            placeholder="Enter publisher"
            type="text"
          />
           <Input 
            label="source"
            name="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="Enter source"
            type="text"
            />
           <Input 
            label="billdate"
            name="billdate"
            value={billdate}
            onChange={(e) => setBilldate(e.target.value)}
            placeholder="2024-06-24"
            type="text"
            />
           <Input 
            label="cost"
            name="cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="489"
            type="text"
            />
          
          <Input 
            label="rack"
            name="rack"
            value={rack}
            onChange={(e) => setRack(e.target.value)}
            placeholder="a_1"
            type="text"
            />
            </div>
                <button type="submit"   className="bg-black relative w-80 ml-16 mb-10 text-center shadow-lg flex items-center justify-center font-bold text-white text-primary-foreground h-11 rounded-md px-8 w-76  cursor-pointer  hover:bg-yellow-400 ">      
                        Submit
                        {/* <FaArrowRight className="h-4 w-4 ml-2"/> */}
                    </button>
          
          
                


        </form>
    </div>

}