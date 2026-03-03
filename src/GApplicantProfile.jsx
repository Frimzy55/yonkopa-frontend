// ApplicantProfile.js
import React from 'react';

const ApplicantProfile = ({ application, onBack, onNext }) => {
  if (!application) return null;

  const handleNext = async () => {
    console.log('Next button clicked'); // Debug log

    try {
      // Convert the date to MySQL DATETIME format
      const formattedDate = new Date(application.applicationDate)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' '); // 'YYYY-MM-DD HH:MM:SS'

      // Call backend API to save applicant profile
      const response = await fetch('http://localhost:5000/api/applications/save-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          loanId: application.id,
          customerId: application.customerId,
          applicantName: application.applicantName,
          contactNumber: application.contactNumber,
          creditOfficer: application.creditOfficer,
          loanType: application.loanType,
          loanAmount: application.loanAmount,
          applicationDate: formattedDate, // ✅ send correct format
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Data saved successfully:', data);
        if (onNext) {
          onNext(application); // Move to next step
        }
      } else {
        console.error('Error saving data:', data.message);
        alert('Error saving profile: ' + data.message);
      }
    } catch (error) {
      console.error('Network or server error:', error);
      alert('Network error. Please check if backend is running.');
    }
  };

  return (
    <div className="mt-5 p-4 border rounded shadow-sm">
      {/* Back button */}
      <button className="btn btn-secondary mb-3 me-2" onClick={onBack}>
        ← Back to Table
      </button>

      {/* Next button */}
      {onNext && (
        <button className="btn btn-primary mb-3" onClick={handleNext}>
          Next →
        </button>
      )}

      <h4>Applicant Profile</h4>
      <table className="table table-bordered mt-3">
        <tbody>
          <tr>
            <th>Loan ID</th>
            <td>#{application.id}</td>
          </tr>
          <tr>
            <th>Customer ID</th>
            <td>#{application.customerId}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{application.applicantName}</td>
          </tr>
          <tr>
            <th>Contact Number</th>
            <td>{application.contactNumber}</td>
          </tr>
          <tr>
            <th>Credit Officer</th>
            <td>{application.creditOfficer}</td>
          </tr>
          <tr>
            <th>Loan Type</th>
            <td>{application.loanType}</td>
          </tr>
          <tr>
            <th>Loan Amount</th>
            <td>₵{Number(application.loanAmount).toLocaleString()}</td>
          </tr>
          <tr>
            <th>Application Date</th>
            <td>{new Date(application.applicationDate).toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ApplicantProfile;