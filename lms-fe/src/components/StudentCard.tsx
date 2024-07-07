import React, { useState } from "react";
import IssueBookModal from "../pages/IssueBook";
import { Button } from "./Button";







export const StudentCard = ({ student }) => {
  const { _id, name, hallTicket, year, batch, dept } = student;
  const [showModal, setShowModal] = useState(false);

  const handleIssueClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-white-200 w-80 p-6 mt-20 rounded-md text-nowrap shadow-lg shadow-slate-200">
      <p>
        <strong>ID:</strong> {_id}
      </p>
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Hall Ticket:</strong> {hallTicket}
      </p>
      <p>
        <strong>Year:</strong> {year}
      </p>
      <p>
        <strong>Batch:</strong> {batch}
      </p>
      <p>
        <strong>Department:</strong> {dept}
      </p>
      <div className="flex justify-evenly mt-3 mb-0 p-0">
        <Button variant="outline" onClick={handleIssueClick}>
          Issue
        </Button>
        {/* Here, IssueBookModal is conditionally rendered */}
        {showModal && (
          <IssueBookModal
            studentId={_id} // Pass student ID to the modal
            onClose={handleCloseModal}
          />
        )}
        <Button variant="destructive">Return</Button>
      </div>
    </div>
  );
};
