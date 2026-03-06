import React, { useState, useEffect } from 'react';
import ApplicantProfile from './GApplicantProfile';
import CollateralDetailsWindow from './GCollateralDetailsWindow';
import AssessmentWindow from './GAssessmentWindow';
import GComments from './GComments';

const STEPS = [
  'Select Application',
  'Applicant Profile',
  'Collateral Details',
  'Borrower Credit',
  'Comments'
];

const CreditAssessmentWizard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppIndex, setSelectedAppIndex] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/loan-applications/pending`
      );

       //const res = await fetch(`${process.env.REACT_APP_API_URL}/api/loan-applications/pending`, {
      if (!response.ok) throw new Error('Failed to fetch');

      const data = await response.json();

      // Transform data and format application date
      const transformedData = data.map(app => ({
        id: app.id,
        customerId:app.kycCode,
        applicantName: app.fullName || 'N/A',
        contactNumber: app.phone || 'N/A',
        creditOfficer: app.creditOfficer || 'N/A',
        loanType: app.loanType || 'other',
        loanAmount: app.loanAmount || 0,
        applicationDate: app.createdAt
          ? new Date(app.createdAt).toLocaleString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })
          : 'N/A',
        creditScore: app.creditScore ?? 0,
        status: app.status || 'pending',
        open: false
      }));

      setApplications(transformedData);
    } catch (err) {
      console.error(err);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= WIZARD CONTROLS ================= */
  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  /* ================= ACTION HANDLERS ================= */
  const toggleDropdown = (id) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id
          ? { ...app, open: !app.open }
          : { ...app, open: false }
      )
    );
  };

  const handleProceed = (index) => {
    setSelectedAppIndex(index);
    setCurrentStep(1);
  };

  const handleSkip = (index) => {
    alert(`Assessment skipped for application #${applications[index].id}`);
  };

  const handleReprocess = (index) => {
    alert(`Reprocess requested for application #${applications[index].id}`);
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border" />
      </div>
    );
  }

  return (
    <div className="container">

      {/* ================= HEADER ================= */}
      <div className="bg-white py-2">
        <h3 className="mb-1">Personal Loan Credit Assessment</h3>
        <h6 className="text-muted mb-3">Applications Pending Assessment</h6>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <strong>Step {currentStep + 1} of {STEPS.length}</strong>
          <span>{STEPS[currentStep]}</span>
        </div>

        <ul className="nav nav-pills justify-content-between mb-2">
          {STEPS.map((step, index) => (
            <li className="nav-item flex-fill text-center" key={index}>
              <span
                className={`nav-link ${index === currentStep ? 'active' : 'disabled'}`}
              >
                {step}
              </span>
            </li>
          ))}
        </ul>

        <hr className="my-2" />
      </div>

      {/* ================= STEP 1: TABLE ================= */}
      {currentStep === 0 && (
        <>
          {applications.length === 0 ? (
            <div className="text-center py-4 text-muted">
              No applications pending assessment
            </div>
          ) : (
            <div>
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                     <th>Customer Id</th>
                    <th>Applicant Name</th>
                    <th>Phone</th>
                    <th>Credit Officer</th>
                    <th>Loan Amount</th>
                    <th>Status</th>
                    <th>Application Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {applications.map((app, index) => (
                    <tr key={app.id}>
                      <td>#{app.id}</td>
                       <td>{app.customerId}</td>
                      <td>{app.applicantName}</td>
                      <td>{app.contactNumber}</td>
                      <td>{app.creditOfficer}</td>
                      <td>₵{Number(app.loanAmount).toLocaleString()}</td>
                      <td>{app.status}</td>
                      <td>{app.applicationDate}</td>

                      {/* ===== ACTIONS DROPDOWN ===== */}
                      <td>
                        <div className="dropdown">
                          <button
                            className="btn btn-sm btn-outline-primary dropdown-toggle"
                            onClick={() => toggleDropdown(app.id)}
                          >
                            Actions
                          </button>

                          {app.open && (
                            <div
                              className="dropdown-menu show"
                              style={{ zIndex: 2000 }}
                            >
                              <button
                                className="dropdown-item"
                                onClick={() => handleProceed(index)}
                              >
                                Proceed
                              </button>

                              <button
                                className="dropdown-item"
                                onClick={() => handleSkip(index)}
                              >
                                Skip Assessment
                              </button>

                              <div className="dropdown-divider"></div>

                              <button
                                className="dropdown-item"
                                onClick={() => handleReprocess(index)}
                              >
                                Reprocess
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* ================= STEP 2 ================= */}
      {currentStep === 1 && selectedAppIndex !== null && (
        <ApplicantProfile
          application={applications[selectedAppIndex]}
          onBack={prevStep}
          onNext={nextStep}
        />
      )}

      {/* ================= STEP 3 ================= */}
      {currentStep === 2 && selectedAppIndex !== null && (
        <CollateralDetailsWindow
          application={applications[selectedAppIndex]}
          onBack={prevStep}
          onNext={nextStep}
        />
      )}

      {/* ================= STEP 4 ================= */}
      {currentStep === 3 && selectedAppIndex !== null && (
        <AssessmentWindow
          application={applications[selectedAppIndex]}
          onBack={prevStep}
          onNext={nextStep}   
        />
      )}

      {/* ================= STEP 5 ================= */}
      {currentStep === 4 && selectedAppIndex !== null && (
        <GComments
          application={applications[selectedAppIndex]}
          onBack={prevStep}
          onSubmit={() => {
            alert("Assessment submitted successfully!");
            setCurrentStep(0);
            setSelectedAppIndex(null);
          }}
        />
      )}

    </div>
  );
};

export default CreditAssessmentWizard;