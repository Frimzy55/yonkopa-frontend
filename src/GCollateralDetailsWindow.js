import { useState } from 'react';

const CollateralDetailsWindow = ({ application, onBack, onNext }) => {
  const [lendingType, setLendingType] = useState('');
  const [collateralType, setCollateralType] = useState('');

  return (
    <div className="p-4 border rounded shadow">
      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-secondary" onClick={onBack}>
          ← Back to Profile
        </button>

        <button
          className="btn btn-primary"
          onClick={onNext}
          disabled={lendingType === 'secured' && !collateralType} // optional: require collateral
        >
          Next →
        </button>
      </div>

      <h4>Collateral Details</h4>
      <p>
        Collateral information for <strong>{application.applicantName}</strong>
      </p>

      {/* Lending Type */}
      <div className="mt-4">
        <h6 className="mb-3">Lending Type</h6>

        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="radio"
            name="lendingType"
            id="securedLending"
            value="secured"
            checked={lendingType === 'secured'}
            onChange={(e) => {
              setLendingType(e.target.value);
              setCollateralType(''); // reset collateral when changing
            }}
          />
          <label className="form-check-label" htmlFor="securedLending">
            Secured Lending
          </label>
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="radio"
            name="lendingType"
            id="unsecuredLending"
            value="unsecured"
            checked={lendingType === 'unsecured'}
            onChange={(e) => {
              setLendingType(e.target.value);
              setCollateralType(''); // reset collateral
            }}
          />
          <label className="form-check-label" htmlFor="unsecuredLending">
            Unsecured Lending
          </label>
        </div>

        {/* Collateral Type Dropdown (Only for Secured Lending) */}
        {lendingType === 'secured' && (
          <div className="mt-3">
            <label className="form-label">Collateral Type</label>
            <select
              className="form-select"
              value={collateralType}
              onChange={(e) => setCollateralType(e.target.value)}
            >
              <option value="">-- Select Collateral Type --</option>
              <option value="land">Land</option>
              <option value="vehicle">Vehicle</option>
              <option value="building">Building</option>
              <option value="cash_fixed_deposit">
                Cash / Fixed Deposit
              </option>
            </select>
          </div>
        )}

        {/* ================= LAND FORM ================= */}
        {collateralType === 'land' && (
          <div className="mt-3 border p-3 rounded">
            <h6>Land Details</h6>
            <div className="mb-3">
              <label className="form-label">Land Location</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Land Size (sq. meters)</label>
              <input type="number" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Land Value (GHS)</label>
              <input type="number" className="form-control" />
            </div>
          </div>
        )}

        {/* ================= VEHICLE FORM ================= */}
        {collateralType === 'vehicle' && (
          <div className="mt-3 border p-3 rounded">
            <h6>Vehicle Details</h6>
            <div className="mb-3">
              <label className="form-label">Vehicle Make</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Vehicle Model</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Vehicle Value (GHS)</label>
              <input type="number" className="form-control" />
            </div>
          </div>
        )}

        {/* ================= BUILDING FORM ================= */}
        {collateralType === 'building' && (
          <div className="mt-3 border p-3 rounded">
            <h6>Building Details</h6>
            <div className="mb-3">
              <label className="form-label">Building Type</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Building Size (sq. meters)</label>
              <input type="number" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Building Value (GHS)</label>
              <input type="number" className="form-control" />
            </div>
          </div>
        )}

        {/* ================= CASH / FIXED DEPOSIT FORM ================= */}
        {collateralType === 'cash_fixed_deposit' && (
          <div className="mt-3 border p-3 rounded">
            <h6>Cash / Fixed Deposit Details</h6>
            <div className="mb-3">
              <label className="form-label">Bank Name</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Account Number</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Deposit Amount (GHS)</label>
              <input type="number" className="form-control" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollateralDetailsWindow;
