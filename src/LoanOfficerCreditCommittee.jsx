const LoanOfficerCreditCommittee = () => {
  const handlePendingApprovals = () => {
    alert("Pending approvals clicked");
    // TODO: Navigate or fetch pending approvals
  };

  const handleApproveFiles = () => {
    alert("Approve files clicked");
    // TODO: Navigate or open approve files page
  };

  return (
    <div className="content-section">
      <h2>Credit Committee</h2>

      <div className="feature-grid" style={{ display: 'flex', gap: '1rem' }}>
        <button
          className="btn btn-primary"
          style={{ flex: 1, padding: '1rem', fontSize: '1rem' }}
          onClick={handlePendingApprovals}
        >
          Pending Approvals
        </button>

        <button
          className="btn btn-primary"
          style={{ flex: 1, padding: '1rem', fontSize: '1rem' }}
          onClick={handleApproveFiles}
        >
          Approve Files
        </button>
      </div>
    </div>
  );
};

export default LoanOfficerCreditCommittee;