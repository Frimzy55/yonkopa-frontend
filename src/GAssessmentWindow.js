import { useState, useEffect } from 'react';

const AssessmentWindow = ({ application, formData, setFormData, onBack, onNext }) => {
  const initialCreditData = formData.borrowerCredit || {};

  const [isCreditworthy, setIsCreditworthy] = useState(initialCreditData.isCreditworthy || false);
  const [businessOverview, setBusinessOverview] = useState(initialCreditData.businessOverview || '');
  const [businessLocation, setBusinessLocation] = useState(initialCreditData.businessLocation || '');
  const [businessStartDate, setBusinessStartDate] = useState(initialCreditData.businessStartDate || '');
  const [nearestLandmark, setNearestLandmark] = useState(initialCreditData.nearestLandmark || '');
  const [businessDescription, setBusinessDescription] = useState(initialCreditData.businessDescription || '');

  // Sync local state to main formData
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      borrowerCredit: {
        isCreditworthy,
        businessOverview,
        businessLocation,
        businessStartDate,
        nearestLandmark,
        businessDescription
      }
    }));
  }, [isCreditworthy, businessOverview, businessLocation, businessStartDate, nearestLandmark, businessDescription, setFormData]);

  return (
    <div className="p-4 border rounded shadow">
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-secondary" onClick={onBack}>
          ← Back
        </button>
        <button className="btn btn-primary" onClick={onNext}>
          Next →
        </button>
      </div>

      <h4>Borrower Credit Assessment</h4>
      <p>Credit information for <strong>{application.applicantName}</strong></p>

      <div className="mt-3">
        {/* Borrower Creditworthy */}
        <div className="mb-3">
          <label className="form-label">Is the Borrower Creditworthy?</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="creditworthy"
                value="yes"
                checked={isCreditworthy === true}
                onChange={() => setIsCreditworthy(true)}
              />
              <label className="form-check-label">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="creditworthy"
                value="no"
                checked={isCreditworthy === false}
                onChange={() => setIsCreditworthy(false)}
              />
              <label className="form-check-label">No</label>
            </div>
          </div>
        </div>

        {/* Business Overview */}
        <div className="mb-3">
          <label className="form-label">Business Overview</label>
          <select
            className="form-select"
            value={businessOverview}
            onChange={(e) => setBusinessOverview(e.target.value)}
          >
            <option value="">Select Business Type</option>
            <option value="Wholesale">Wholesale</option>
            <option value="Retailer">Retailer</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Business Location & Details */}
        <h5 className="mt-4">Business Location & Details</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Business Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter business location"
              value={businessLocation}
              onChange={(e) => setBusinessLocation(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Business Start Date</label>
            <input
              type="date"
              className="form-control"
              value={businessStartDate}
              onChange={(e) => setBusinessStartDate(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Nearest Landmark</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter nearest landmark"
              value={nearestLandmark}
              onChange={(e) => setNearestLandmark(e.target.value)}
            />
          </div>

          <div className="col-12">
            <label className="form-label">Business Description</label>
            <textarea
              className="form-control"
              rows={3}
              placeholder="Enter business description"
              value={businessDescription}
              onChange={(e) => setBusinessDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentWindow;