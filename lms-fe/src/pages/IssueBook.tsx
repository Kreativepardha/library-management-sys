import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Button } from "../components/Button";

const IssueBookModal = ({ studentId, onClose }) => {
  const [bookId, setBookId] = useState("");
  const [issuedDate, setIssuedDate] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState(null);

  const handleIssueBook = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/issue`,
        {
          book_id: bookId,
          student_id: studentId, // Use the passed student ID
          issuedDate: issuedDate,
        },
        {
          headers: {
            Authorization: token,
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
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Issue Book</h2>
        <form onSubmit={handleIssueBook}>
          <div className="form-group">
            <label htmlFor="bookId">Book ID:</label>
            <input
              type="text"
              id="bookId"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="issuedDate">Issued Date:</label>
            <input
              type="date"
              id="issuedDate"
              value={issuedDate}
              onChange={(e) => setIssuedDate(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit">Issue Book</Button>
            <Button variant="outline" onClick={onClose}>
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
