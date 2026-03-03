import React, { useState } from "react";

const GComments = ({ application, onBack, onSubmit }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!comment.trim()) {
      alert("Please enter a comment before submitting.");
      return;
    }

    console.log("Submitting comment:", comment);
    console.log("Application ID:", application.id);

    // You can later connect this to backend API
    onSubmit();
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="mb-3">Assessment Comments</h5>

        <div className="mb-3">
          <label className="form-label">Write Comment</label>
          <textarea
            className="form-control"
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter assessment notes here..."
          />
        </div>

        <div className="d-flex justify-content-between">
          <button className="btn btn-secondary" onClick={onBack}>
            Back
          </button>

          <button className="btn btn-success" onClick={handleSubmit}>
            Submit Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default GComments;