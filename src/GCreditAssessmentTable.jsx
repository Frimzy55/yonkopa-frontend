import React, { useState, useEffect } from "react";
import ApplicantProfile from "./GApplicantProfile";

const CreditAssessmentWizard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/loan-applications/pending`
      );

      const data = await response.json();

      const transformedData = data.map((app) => ({
        id: app.id,
        customerId: app.kycCode,
        applicantName: app.fullName || "N/A",
        contactNumber: app.phone || "N/A",
        creditOfficer: app.creditOfficer || "N/A",
        loanType: app.loanType || "other",
        loanAmount: app.loanAmount || 0,
        applicationDate: app.createdAt,
        status: app.status || "pending",
        open: false,
      }));

      setApplications(transformedData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = (id) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, open: !app.open } : { ...app, open: false }
      )
    );
  };

  const handleProceed = (application) => {
    setSelectedApplication(application); // 👉 Open Applicant Profile
  };

  const handleBack = () => {
    setSelectedApplication(null); // 👉 Return to table
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border" />
      </div>
    );
  }

  return (
    <div className="container">

      {/* ================= SHOW APPLICANT PROFILE ================= */}
      {selectedApplication && (
        <ApplicantProfile
          application={selectedApplication}
          onBack={handleBack}
        />
      )}

      {/* ================= SHOW TABLE ================= */}
      {!selectedApplication && (
        <>
          <h3>Loan Applications</h3>
          <h6 className="text-muted">Applications Pending Assessment</h6>

          {applications.length === 0 ? (
            <div className="text-center py-4 text-muted">
              No applications pending
            </div>
          ) : (
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Customer ID</th>
                  <th>Applicant Name</th>
                  <th>Phone</th>
                  <th>Loan Amount</th>
                  <th>Status</th>
                  <th>Application Date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td>#{app.id}</td>
                    <td>{app.customerId}</td>
                    <td>{app.applicantName}</td>
                    <td>{app.contactNumber}</td>
                    <td>₵{Number(app.loanAmount).toLocaleString()}</td>
                    <td>{app.status}</td>
                    <td>
                      {new Date(app.applicationDate).toLocaleString()}
                    </td>

                    <td>
                      <div className="dropdown">
                        <button
                          className="btn btn-sm btn-outline-primary dropdown-toggle"
                          onClick={() => toggleDropdown(app.id)}
                        >
                          Actions
                        </button>

                        {app.open && (
                          <div className="dropdown-menu show">
                            <button
                              className="dropdown-item"
                              onClick={() => handleProceed(app)}
                            >
                              Proceed
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default CreditAssessmentWizard;