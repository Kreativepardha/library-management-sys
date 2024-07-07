import React, { FormEvent, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Button } from "../components/Button";
import Input from "../components/Input";

const IssueBookModal = ({ studentId, onClose }) => {
  const [bookId, setBookId] = useState("");
  const [issuedDate, setIssuedDate] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState(null);

  const handleIssueBook = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const payload = {
          id: studentId, 
            accessionNo: bookId,
            issuedDate: issuedDate,
      }
      console.log(payload)
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/issue`,
      payload,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      setSuccessMsg(response.data.msg);
      setBookId("");
      setIssuedDate("");
      setError("");
      onClose(); // Close the modal after successful issue
    } catch (err) {
      console.error(err);
      setError("Failed to issue book. Please try again later.");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white w-2/4 p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Issue Book</h2>
        <form onSubmit={handleIssueBook}>
          <div className="form-group">
            <label htmlFor="bookId">Accession No:</label>
            <Input
            placeholder="enter accession no"
              type="text"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="issuedDate">Issued Date:</label>
            <Input
            placeholder="enter date"
              type="date"
              value={issuedDate}
              onChange={(e) => setIssuedDate(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-around">
            <Button type="submit">Issue Book</Button>
            <Button variant="destructive" onClick={onClose}>
              Cancel
            </Button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {successMsg && <p className="text-green-500">{successMsg}</p>}
        </form>
      </div>
    </div>
  );
};

export default IssueBookModal;
