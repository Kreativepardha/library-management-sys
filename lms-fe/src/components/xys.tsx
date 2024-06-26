import { useState } from "react"
import Input from "../components/Input";



export const BookForm = () => {
        const [formData, setFormData] = useState({
          accessionNo: '',
          author: '',
          edition: '',
          title: '',
          pages: '',
          volume: '',
          publisher: '',
          source: '',
          billdate: '',
          cost: '',
          rackno: ''
        });

        const handleChange = (e:any) =>{ 
          const {name, value} = e.target;
          setFormData({
            ...formData,
            [name]: value

          })
        }

          const handleSubmit = (e:any) => {
            e.preventDefault();
            //backend api
            console.log(formData)
          }
          
    return <div>
        <form onSubmit={handleSubmit}>
          <Input 
            label="Accession Number"
            name="Accession Number"
            value={formData.accessionNo}
            onChange={handleChange}
            placeholder="Enter Accession Number"
            type="text"
          />
  
        </form>
    </div>

}