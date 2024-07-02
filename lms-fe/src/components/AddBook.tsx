import { FormEvent, useState } from "react";
import Input from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Button } from "../components/Button";
import { Navbar } from "./Navbar";

export const AddBook = () => {
  const [accessionNo, setAccessionNo] = useState("");
  const [author, setAuthor] = useState("");
  const [edition, setEdition] = useState("");
  const [title, setTitle] = useState("");
  const [pages, setPages] = useState("");
  const [volume, setVolume] = useState("");
  const [publisher, setPublisher] = useState("");
  const [source, setSource] = useState("");
  const [billdate, setBilldate] = useState("");
  const [cost, setCost] = useState("");
  const [rack, setRack] = useState("");
  const [error, setError] = useState("");

  // Function to retrieve token from local storage
  const getToken = () => {
    const token = localStorage.getItem("token");
    console.log("Retrieved token:", token); // Log to check token retrieval
    return token;
  };

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const token = getToken();
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    try {
      console.log("Before Axios POST request"); // Debugging log
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/book`,
        {
          accessionNo,
          author,
          edition,
          title,
          pages,
          volume,
          publisher,
          source,
          billdate,
          cost,
          rack,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure the token is passed correctly
            "Content-Type": "application/json",
          },
        }
      );
      console.log("After Axios POST request"); // Debugging log
      console.log(response.data);
      alert("Book added successfully!");

      // Reset form fields
      setAccessionNo("");
      setAuthor("");
      setEdition("");
      setTitle("");
      setPages("");
      setVolume("");
      setPublisher("");
      setSource("");
      setBilldate("");
      setCost("");
      setRack("");
    } catch (err) {
      console.error("Error in Axios POST request", err); // More specific error log
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setError("Unauthorized: Invalid token. Please log in again.");
      } else {
        setError("An error occurred during registration. Please try again.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-screen w-full flex justify-center items-center bg-sky-300">
        <form
          onSubmit={handleSubmit}
          className="w-92 border-t-2 shadow-lg rounded-lg absolute bg-yellow-200"
        >
          <h1 className="font-extrabold text-center mt-4 text-slate-900">Add Book</h1>
          <div className="grid grid-cols-2 m-4">
            <Input
              label="Accession no"
              name="accessionNo"
              value={accessionNo}
              onChange={(e) => setAccessionNo(e.target.value)}
              placeholder="Enter Accession No"
              type="text"
            />
            <Input
              label="Author"
              name="author"
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
              label="Publisher"
              name="publisher"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              placeholder="Enter publisher"
              type="text"
            />
            <Input
              label="Source"
              name="source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="Enter source"
              type="text"
            />
            <Input
              label="Bill Date"
              name="billdate"
              value={billdate}
              onChange={(e) => setBilldate(e.target.value)}
              placeholder="2024-06-24"
              type="text"
            />
            <Input
              label="Cost"
              name="cost"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              placeholder="489"
              type="text"
            />
            <Input
              label="Rack"
              name="rack"
              value={rack}
              onChange={(e) => setRack(e.target.value)}
              placeholder="a_1"
              type="text"
            />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="w-61 flex justify-center items-center mb-2">
            <Button size="lg">Submit</Button>
          </div>
        </form>
      </div>
    </>
  );
};
