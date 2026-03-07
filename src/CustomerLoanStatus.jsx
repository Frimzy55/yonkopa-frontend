import React from "react";

const statuses = [
  { name: "Pending", color: "#f0ad4e" },
  { name: "Under Review", color: "#5bc0de" },
  { name: "Approved", color: "#0275d8" },
  { name: "Rejected", color: "#d9534f" },
  { name: "Disbursed", color: "#5cb85c" },
  { name: "Active", color: "#20c997" },
  { name: "Overdue", color: "#ff6b6b" },
  { name: "Closed", color: "#6c757d" },
  { name: "Defaulted", color: "#343a40" },
];

const CustomerLoanStatus = () => {
  return (
    <div className="content-section">
      <h2 style={{ marginBottom: "20px" }}>Customer Loan Status</h2>
      <p style={{ marginBottom: "25px", color: "#666" }}>
        Track the current stage of your loan application.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "15px",
        }}
      >
        {statuses.map((status, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              borderRadius: "10px",
              padding: "20px",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              borderLeft: `6px solid ${status.color}`,
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>{status.name}</h3>
            <span
              style={{
                padding: "6px 12px",
                borderRadius: "20px",
                background: status.color,
                color: "#fff",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              {status.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerLoanStatus;