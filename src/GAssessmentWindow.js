import React, { useState,useEffect} from 'react';
import { FaRegCreditCard } from 'react-icons/fa'; // Credit card icon
//import { calculateCostOfGoodsSold } from "./calculations"; 
//import { calculateCostOfGoodsSold, calculateGrossProfit, calculateTotalOperatingExpenses, } from './calculations';
//import LoanCalculator from './LoanCalculator'; 
import Expenses from './GExpenses';
import axios from 'axios';

import {
  calculateCostOfGoodsSold,
  calculateGrossProfit,
  calculateTotalOperatingExpenses,
  calculateNetBusinessProfit,
  calculateHouseholdSurplus,
} from './Gcalculations';



const CreditWorthDetail = ({  onBack, onNext, hasNext }) => {
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isCreditworthy, setIsCreditworthy] = useState(null); // State to track creditworthiness
  const [businessType, setBusinessType] = useState(''); // State to track business type
  const [businessLocation, setBusinessLocation] = useState(''); // Business location
  const [businessStartDate, setBusinessStartDate] = useState(''); // Business start date
  const [nearestLandmark, setNearestLandmark] = useState(''); // Nearest landmark
  const [businessDescription, setBusinessDescription] = useState(''); // Business description
  const [canPayLoan, setCanPayLoan] = useState(null); // State to track loan payment ability
  const [currentStockValue, setCurrentStockValue] = useState(''); // Current stock value
  const [startedBusinessWith, setStartedBusinessWith] = useState(''); // Started business with
  const [sourceOfFund, setSourceOfFund] = useState(''); // Source of fund
  //const [householdExpenses, setHouseholdExpenses] = useState(''); 
  const [monthlySalesRevenue, setMonthlySalesRevenue] = useState(0); 
  const [handleSalesRevenueChange, setHandleSalesRevenueChange] = useState(0); 
  //const [otherIncome, setOtherIncome] = useState(''); /// Monthly Sales Revenue
  const [costOfGoodsSold, setCostOfGoodsSold] = useState(0);
  const [result, setResult] = useState(""); 
  const [grossProfit, setGrossProfit] = useState(0); // State for Gross Profit
  const [totalOperatingExpenses, setTotalOperatingExpenses] = useState(0);
  const [netBusinessProfit, setNetBusinessProfit] = useState(0);
  const [grossMarginInput, setGrossMarginInput] = useState(0);
  //const [otherIncome, setOtherIncome] = useState(0);
//const [householdExpenses, setHouseholdExpenses] = useState(0);
  const [householdSurplus, setHouseholdSurplus] = useState(0);
  const [otherIncomeInput, setOtherIncomeInput] = useState(0);
  const [householdExpensesInput, setHouseholdExpensesInput] = useState(0);
  const [loanRe, setLoanRecommendation] = useState(0);
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [interest, setInterest] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [monthlyInstallment, setMonthlyInstallment] = useState(0);
  const [surplus, setSurplus] = useState(0);
  const [surplusValue, setSurplusValue] = useState(0);
  //const [grossMargin, setGrossMargin] = useState(0);
 const [surplusInterpretation, setSurplusInterpretation] = useState("")




 


  
  
   
  
  const recalculateResults = () => {
    const salesRevenue = parseFloat(monthlySalesRevenue) || 0;
    const grossMarginPercentage = parseFloat(grossMarginInput) || 0;

    // Calculate COGS
    const cogs = calculateCostOfGoodsSold(salesRevenue, grossMarginPercentage);
    setCostOfGoodsSold(cogs);

    // Calculate Gross Profit
    const grossProfitVal = calculateGrossProfit(salesRevenue, cogs);
    setGrossProfit(grossProfitVal);

    // Calculate Total Operating Expenses
    const totalExpenses = calculateTotalOperatingExpenses(salesRevenue, cogs, grossProfitVal, grossMarginPercentage);
    setTotalOperatingExpenses(totalExpenses);

    // Calculate Net Business Profit
    const netProfit = calculateNetBusinessProfit(grossProfitVal, totalExpenses);
    setNetBusinessProfit(netProfit);

    // Calculate Household Surplus
    const otherIncome = parseFloat(otherIncomeInput) || 0;
    const householdExpenses = parseFloat(householdExpensesInput) || 0;
    const surplus = calculateHouseholdSurplus(netProfit, otherIncome, householdExpenses);
    setHouseholdSurplus(surplus);

    // Calculate loan recommendation (60% of household surplus)
    const loanRec = surplus * 0.6;
    setLoanRecommendation(loanRec);
  };

  // Trigger recalculation when any of the relevant fields change
  useEffect(() => {
    recalculateResults();
  }, [monthlySalesRevenue, grossMarginInput, otherIncomeInput, householdExpensesInput]);


 
  

  

  const handleDisplayResult = () => {
    setResult(
      `Monthly Sales Revenue: GH¢${monthlySalesRevenue}, 
       Cost of Goods Sold: GH¢${costOfGoodsSold}, 
       Gross Profit: GH¢${grossProfit}`
         
      );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleDisplayResult(); // Trigger result display on Enter
    }
  };



  const handleCreditworthinessChange = (e) => {
    setIsCreditworthy(e.target.value);
    if (e.target.value === 'no') {
      setBusinessType(''); // Reset business type if "No" is selected
    }
  };

  const handleBusinessTypeChange = (e) => {
    setBusinessType(e.target.value);
  };

  const handleLoanAbilityChange = (e) => {
    setCanPayLoan(e.target.value);
  };

  const handleSourceOfFundChange = (e) => {
    setSourceOfFund(e.target.value);
  };

  const handleSubmit = async () => {
   // try {
      const payload = {
        //customer_id: customer.customer_id,
        isCreditworthy,
        businessType,
        businessLocation,
        businessStartDate,
        nearestLandmark,
        businessDescription,
        canPayLoan,
        currentStockValue,
        startedBusinessWith,
        sourceOfFund,
        principal,
        rate,
        loanTerm,
        loanAmount,
        interest,
        monthlyInstallment,
        monthlySalesRevenue,
        grossMarginInput,
        grossProfit,
        costOfGoodsSold,
        totalOperatingExpenses,
        netBusinessProfit,
        householdExpensesInput,
        otherIncomeInput,
        loanRe,
        householdSurplus,
        surplus,
        
        surplusInterpretation
      };
  
      console.log('Payload:', payload); // Debugging: Ensure the payload is as expected
    try {
      await axios.post('http://localhost:5001/api/credit', payload);
  
      // If no error, assume success
      setSubmitStatus({ success: true, message: 'Form submitted successfully!' });
    } catch (error) {
      console.error('Error saving data:', error.response || error.message);
      setSubmitStatus({ danger: false, message: 'Error submitting form. Please try again.' });
    }
  };
  

  const handleOkClick = () => {
    setSubmitStatus(null);
  };
  //};

  return (
    <div className="container my-4 md-1" style={{ transform: 'scale(0.9)', transformOrigin: 'top center' }}>
      <div className="card shadow-lg rounded">
        <div className="card-header bg-white text-primary d-flex justify-content-between align-items-center">
          <h3 className="mb-0">
            <FaRegCreditCard className="me-2" /> Assess Borrower's Credit Worthiness
          </h3>
          <div>
            <button className="btn btn-secondary btn-sm me-2" onClick={onBack}>Back to Collateral Details</button>
            {/* <button className="btn btn-success btn-sm" onClick={onNext} disabled={!hasNext}>Next</button> */}
            <button 
                 className="btn btn-success btn-sm" 
                 onClick={onNext}
              >
              Next
             </button>
          </div>
        </div>
        <div className="card-body">
          <div className="mb-4">
            <label className="form-label text-primary">Is the Borrower Creditworthy?</label>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="creditworthyYes"
                value="yes"
                checked={isCreditworthy === 'yes'}
                onChange={handleCreditworthinessChange}
              />
              <label className="form-check-label" htmlFor="creditworthyYes">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="creditworthyNo"
                value="no"
                checked={isCreditworthy === 'no'}
                onChange={handleCreditworthinessChange}
              />
              <label className="form-check-label" htmlFor="creditworthyNo">No</label>
            </div>
          </div>

          {isCreditworthy === 'yes' && (
            <>
              <div className="mb-4">
                <h5 className="text-primary">Business Overview</h5>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="wholesale"
                    value="wholesale"
                    checked={businessType === 'wholesale'}
                    onChange={handleBusinessTypeChange}
                  />
                  <label className="form-check-label" htmlFor="wholesale">Wholesale</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="retailer"
                    value="retailer"
                    checked={businessType === 'retailer'}
                    onChange={handleBusinessTypeChange}
                  />
                  <label className="form-check-label" htmlFor="retailer">Retailer</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="others"
                    value="others"
                    checked={businessType === 'others'}
                    onChange={handleBusinessTypeChange}
                  />
                  <label className="form-check-label" htmlFor="others">Others</label>
                </div>
              </div>

              <div className="row">
              
                <div className="col-md-6 mb-4">
                  <label htmlFor="businessLocation" className="form-label text-primary">Business Location</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="businessLocation"
                    value={businessLocation}
                    onChange={(e) => setBusinessLocation(e.target.value)}
                    placeholder="Enter business location"
                    required
                  />
                </div>
                <div className="col-md-6 mb-4">
                  <label htmlFor="businessStartDate" className="form-label text-primary">Business Start Date</label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    id="businessStartDate"
                    value={businessStartDate}
                    onChange={(e) => setBusinessStartDate(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6 mb-4">
                  <label htmlFor="nearestLandmark" className="form-label text-primary">Nearest Landmark</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="nearestLandmark"
                    value={nearestLandmark}
                    onChange={(e) => setNearestLandmark(e.target.value)}
                    placeholder="Enter nearest landmark"
                    required
                  />
                </div>
                <div className="col-md-6 mb-4">
                  <label htmlFor="businessDescription" className="form-label text-primary">Business Description</label>
                  <textarea
                    className="form-control form-control-sm"
                    id="businessDescription"
                    value={businessDescription}
                    onChange={(e) => setBusinessDescription(e.target.value)}
                    placeholder="Enter business description"
                    rows="3"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <h5 className="text-primary">Determine Borrower's Ability to Pay Loan</h5>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="canPayYes"
                    value="yes"
                    checked={canPayLoan === 'yes'}
                    onChange={handleLoanAbilityChange}
                  />
                  <label className="form-check-label" htmlFor="canPayYes">Yes</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="canPayNo"
                    value="no"
                    checked={canPayLoan === 'no'}
                    onChange={handleLoanAbilityChange}
                  />
                  <label className="form-check-label" htmlFor="canPayNo">No</label>
                </div>
              </div>

              {canPayLoan === 'yes' && (
                <>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <label htmlFor="currentStockValue" className="form-label text-primary">Current Stock Value</label>
                    <div className="input-group">
                      <div className="input-group-text bg-light text-muted">GH¢</div>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        id="currentStockValue"
                        value={currentStockValue}
                        onChange={(e) => setCurrentStockValue(e.target.value)}
                        placeholder="0.00"
                        required
                      />
                    </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <label htmlFor="startedBusinessWith" className="form-label text-primary">Started Business With</label>
                    <div className="input-group">
                      <div className="input-group-text bg-light text-muted">GH¢</div>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        id="startedBusinessWith"
                        value={startedBusinessWith}
                     
                        onChange={(e) => setStartedBusinessWith(e.target.value)}
                        placeholder="0.00"
                        required
                      />
                    </div>
                    </div>

                    {/* <div className="mb-4">
                   <h5 className="text-primary">Loan Calculator</h5>
                   <LoanCalculator
                      
                      
                      />
                  </div> */}
                  

                   


                  </div>

                  <div className="mb-4">
                    <h5 className="text-primary">Source of Fund</h5>
                    <div className="form-check form-check-inline">
                    
                      
                      <input
                        type="radio"
                        className="form-check-input"
                        id="personalSavings"
                        value="personalSavings"
                        checked={sourceOfFund === 'personalSavings'}
                        onChange={handleSourceOfFundChange}
                      />
                      <label className="form-check-label" htmlFor="personalSavings">Personal Savings</label>
                    </div>
                    
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="loan"
                        value="loan"
                        checked={sourceOfFund === 'loan'}
                        onChange={handleSourceOfFundChange}
                      />
                      <label className="form-check-label" htmlFor="loan">Loan</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="othersSource"
                        value="others"
                        checked={sourceOfFund === 'others'}
                        onChange={handleSourceOfFundChange}
                      />
                      <label className="form-check-label" htmlFor="othersSource">Others</label>
                      
                    </div>
                   {/* {submitStatus && (
                        <div className={`alert ${submitStatus.success ? 'alert-success' : 'alert-danger'}`}>
                            {submitStatus.message}
                           <button
                            type="button"
                            className="btn btn-sm btn-link float-end"
                              onClick={handleOkClick}
                              >
                                 OK
                           </button>
                        </div>
                     )}

                    <div className="card-footer">
                        <button className="btn btn-primary" onClick={handleSubmit}>
                         Save
                        </button>
                  </div> */}
                    <br></br>
                    <br></br>
                    <br></br>

                    


                <div className='row'>
                <Expenses
                 //customer={customer}
                 principal={principal}
                 setPrincipal={setPrincipal}
                 rate={rate}
                 setRate={setRate}
                 loanTerm={loanTerm}
                 setLoanTerm={setLoanTerm}
                 interest={interest}
                 setInterest={setInterest}
                 loanAmount={loanAmount}
                 setLoanAmount={setLoanAmount}
                 monthlyInstallment={monthlyInstallment}
                 setMonthlyInstallment={setMonthlyInstallment}
                  grossMarginInput={grossMarginInput}
                  setGrossMarginInput={setGrossMarginInput}
                  monthlySalesRevenue={monthlySalesRevenue}
                  setMonthlySalesRevenue={setMonthlySalesRevenue}
                 handleSalesRevenueChange={handleSalesRevenueChange}
                 setHandleSalesRevenueChange={setHandleSalesRevenueChange}
                 costOfGoodsSold={costOfGoodsSold}
                 setCostOfGoodsSold={setCostOfGoodsSold}
                 grossProfit={grossProfit}
                 setGrossProfit={setGrossProfit}
                 totalOperatingExpenses={totalOperatingExpenses}
                 setTotalOperatingExpenses={setTotalOperatingExpenses}
                 netBusinessProfit={netBusinessProfit}
                 setNetBusinessProfit={setNetBusinessProfit}
                 householdExpensesInput={householdExpensesInput}
                 setHouseholdExpensesInput={setHouseholdExpensesInput}
                 otherIncomeInput={otherIncomeInput}
                 
                 setOtherIncomeInput={setOtherIncomeInput}
                 householdSurplus={householdSurplus}
                 setHouseholdSurplus={setHouseholdSurplus}
                 loanRe={loanRe}
                 setLoanRecommendation={setLoanRecommendation}

                 surplusValue={surplusValue}
                 setSurplusValue={setSurplusValue}
                 //setLoanRecommendation={handleLoanRecommendationUpdate}
                 //handleSurplusCalculation={handleSurplusCalculation}
                 surplus={surplus}
                 setSurplus={setSurplus}
                 handleDisplayResult={handleDisplayResult}
                 //result={result}
                 surplusInterpretation={surplusInterpretation}
                 setSurplusInterpretation={setSurplusInterpretation}
                />

                  {submitStatus && (
                        <div className={`alert ${submitStatus.success ? 'alert-success' : 'alert-danger'}`}>
                            {submitStatus.message}
                           <button
                            type="button"
                            className="btn btn-sm btn-link float-end"
                              onClick={handleOkClick}
                              >
                                 OK
                           </button>
                        </div>
                     )}

                    <div className="card-footer">
                        <button className="btn btn-primary" onClick={handleSubmit}>
                         Save
                        </button>
                  </div>

              </div>


                  </div>
                </>
              )}
            </>
          )}

        <div className="text-center mt-3">
           
          </div>
         {result && (
          <div className="mt-4 alert alert-success">
          {result}
        </div>
      )}





        </div>
      </div>
    </div>
  );
};

export default CreditWorthDetail;