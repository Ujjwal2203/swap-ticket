// MultiStepForm.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const ResellTickets = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="w-full max-w-4xl bg-white p-12 rounded-lg shadow-lg ">
        <div className="pb-8">
          {currentStep === 1 && <Step1 />}
          {currentStep === 2 && <Step2 />}
          {/* Add more steps here */}
        </div>

        <div className="flex justify-between">
          <button
            onClick={prevStep}
            className="bg-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-semibold"
            disabled={currentStep === 1}
          >
            Back
          </button>
          <button
            onClick={nextStep}
            className="bg-pink-500 text-white px-8 py-3 rounded-lg text-lg font-semibold"
          >
            {currentStep === 2 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Step1 = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-center">Sell Your Tickets Quickly</h1>
      <input
        type="text"
        placeholder="Search by event"
        className="w-full px-6 py-4 border border-gray-300 rounded-lg text-xl mb-6"
      />
      <ul className="space-y-4">
        <li className="flex items-center space-x-4">
          <span className="bg-pink-100 text-pink-500 px-5 py-3 rounded-full text-xl font-semibold">1</span>
          <span className="text-xl">Forward your Ticket mail</span>
        </li>
        <li className="flex items-center space-x-4">
          <span className="bg-pink-100 text-pink-500 px-5 py-3 rounded-full text-xl font-semibold">2</span>
          <span className="text-xl">Click "I’ve forwarded my tickets" button</span>
        </li>
        <li className="flex items-center space-x-4">
          <span className="bg-pink-100 text-pink-500 px-5 py-3 rounded-full text-xl font-semibold">3</span>
          <span className="text-xl">Set your price and sell quickly</span>
        </li>
      </ul>
      <div className="mt-12 text-center">
      <Link to="/create-event">
        <button className="bg-gray-200 px-6 py-3 rounded-lg text-lg font-semibold">
          Create an event
        </button>
      </Link>
      </div>
    </div>
  );
};

const Step2 = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-center">Step 2: Confirm Details</h1>
      <p className="text-xl text-gray-600">This is where step 2 form content goes.</p>
    </div>
  );
};

export default ResellTickets;
