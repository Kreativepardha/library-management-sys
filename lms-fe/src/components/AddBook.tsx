import { FormEvent, useState } from "react";
import Input from "../components/Input";
import { Button } from "../components/Button";
import { Navbar } from "./Navbar";
import { BACKEND_URL } from "../config";

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
  const [rackno, setRackno] = useState("");
  const [error, setError] = useState("");

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const token = getToken();

    if (!token) {
      setError("User is not authenticated. Please log in.");
      return;
    }

    try {
      const validatedData = {
        accessionNo,
        author,
        title,
        edition,
        pages: parseInt(pages),
        volume,
        publisher,
        source,
        billdate,
        cost: parseInt(cost),
        rackno,
      };

      const response = await fetch(`${BACKEND_URL}/api/v1/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjdhNGFjZGQ2YjBlOGY2ODM2MDI3NmUiLCJpYXQiOjE3MTkyOTA1NzN9.ouY0oHyaWmMLYOJ0PAPc0-DYKc1JlvN0u6vCN3G_NVo`,
        },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status} - ${errorMessage}`
        );
      }

      const responseData = await response.json();
      console.log(responseData);
      alert("Book added successfully!");

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
      setRackno("");
    } catch (err) {
      console.error(err);
      setError("An error occurred during registration. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-screen w-full flex justify-center items-center bg-sky-300">
        <form
          onSubmit={handleSubmit}
          className="w-92 border-t-2  shadow-lg rounded-lg  absolute bg-yellow-200"
        >
          <h1 className="font-extrabold text-center mt-4 text-slate-900">
            Add Book
          </h1>
          <div className="grid grid-cols-2 m-4">
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
              value={rackno}
              onChange={(e) => setRackno(e.target.value)}
              placeholder="a-1"
              type="text"
            />
          </div>
          <div className="w-61 flex justify-center items-center mb-2">
            <Button size="lg">Submit</Button>
          </div>
        </form>
      </div>
    </>
  );
};
