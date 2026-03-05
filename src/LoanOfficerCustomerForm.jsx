// src/pages/CustomerDashboard/KYCVerification.jsx
import React, { useState } from "react";
import "./CustomerCompleteKyc.css";

const CustomerForm = ({ user }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  //const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    maritalStatus: "",
    nationalId: "",
    passportNumber: "",
    taxId: "",

    // Contact Info
    mobileNumber: "",
    email: "",
    residentialAddress: "",
    city: "",
    state: "",
    zipCode: "",
    postalAddress: "",

    // Employment/Income
    employmentStatus: "",
    employerName: "",
    jobTitle: "",
    monthlyIncome: "",
    businessType: "",
    yearsInCurrentEmployment: "",

    // Bank Details
    bankName: "",
    bankAccountNumber: "",
    accountType: "",
    branch: "",

    // Loan Info
    loanPurpose: "",
    existingLoans: "",

    // Documents
    idDocument: null,
    addressProof: null,
    incomeProof: null,
  });

  const steps = [
    { number: 1, title: "Personal Info", description: "Basic personal details" },
    { number: 2, title: "Contact Info", description: "Contact information" },
    { number: 3, title: "Employment Info", description: "Employment status" },
    { number: 4, title: "Bank Details", description: "Bank account information" },
    { number: 5, title: "Loan Info", description: "Loan purpose and details" },
    { number: 6, title: "Document Upload", description: "Upload required documents" },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));

  const prevStep = () =>
    setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setSuccess(false);

  const form = new FormData();

  Object.keys(formData).forEach((key) => {
    form.append(key, formData[key]);
  });

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/kyc/submit`,
      {
        method: "POST",
        body: form
      }
    );

    const result = await response.json();

    if (response.ok) {
      setSuccess(true);        // ✅ Show success message
      setCurrentStep(1);       // Reset wizard
      setFormData({
        firstName: "", middleName: "", lastName: "", dateOfBirth: "", gender: "",
        nationality: "", maritalStatus: "", nationalId: "", passportNumber: "", taxId: "",
        mobileNumber: "", email: "", residentialAddress: "", city: "", state: "",
        zipCode: "", postalAddress: "",
        employmentStatus: "", employerName: "", jobTitle: "", monthlyIncome: "",
        businessType: "", yearsInCurrentEmployment: "",
        bankName: "", bankAccountNumber: "", accountType: "", branch: "",
        loanPurpose: "", existingLoans: "",
        idDocument: null, addressProof: null, incomeProof: null
      });

    } else {
      console.error(result.message);
    }

  } catch (error) {
    console.error("Error submitting form:", error);
  }

  setLoading(false);
};

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step">
            {success && (
  <div className="success-msg">
    KYC submitted successfully!
  </div>
)}
            <h3>Personal Information</h3>

            <div className="form-grid">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name *"
                required
              />

              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
                placeholder="Middle Name"
              />

              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name *"
                required
              />

              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
              />

              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                placeholder="Nationality *"
                required
              />

              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleInputChange}
              >
                <option value="">Marital Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>

              <input
                type="text"
                name="nationalId"
                value={formData.nationalId}
                onChange={handleInputChange}
                placeholder="National ID *"
                required
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="form-step">
            <h3>Document Upload</h3>

            <input
              type="file"
              name="idDocument"
              onChange={handleInputChange}
              accept=".jpg,.jpeg,.png,.pdf"
              required
            />

            <input
              type="file"
              name="addressProof"
              onChange={handleInputChange}
              accept=".jpg,.jpeg,.png,.pdf"
              required
            />

            <input
              type="file"
              name="incomeProof"
              onChange={handleInputChange}
              accept=".jpg,.jpeg,.png,.pdf"
              required
            />
          </div>
        );

      default:
        return <div className="form-step">Step {currentStep}</div>;
    }
  };

  return (
    <div className="content-section">
      <h2>KYC Verification</h2>

      {/* Progress Bar */}

      <div className="kyc-progress-container">
        {steps.map((step, index) => {
          const stepCompleted = currentStep > step.number;
          const stepActive = currentStep === step.number;

          return (
            <div key={step.number} className="progress-step-wrapper">
              {index !== 0 && (
                <div
                  className={`progress-line ${
                    stepCompleted ? "completed" : ""
                  }`}
                ></div>
              )}

              <div
                className={`progress-step-circle ${
                  stepCompleted ? "completed" : ""
                } ${stepActive ? "active" : ""}`}
              >
                {stepCompleted ? "✓" : step.number}
              </div>

              <div className="progress-step-label">
                <span className="title">{step.title}</span>
                <span className="desc">{step.description}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Form */}

      <form onSubmit={handleSubmit} className="kyc-form">
        {renderStep()}

        <div className="form-navigation">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="nav-btn prev-btn"
            >
              Previous
            </button>
          )}

          {currentStep < steps.length ? (
            <button
              type="button"
              onClick={nextStep}
              className="nav-btn next-btn"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="nav-btn submit-btn"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit for Verification"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;