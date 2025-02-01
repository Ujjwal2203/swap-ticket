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
    <div className="min-h-screen pt-8 flex items-start justify-center  bg-gradient-to-br from-gray-100 to-gray-50">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl transform transition-all duration-500">
        {/* Step Content */}
        <div className="pb-6">
          {currentStep === 1 && <Step1 />}
          {currentStep === 2 && <Step2 />}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            className={`bg-gray-300 text-gray-700 px-8 py-3 rounded-full text-xl font-bold transition-transform ${
              currentStep === 1 ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
            }`}
            disabled={currentStep === 1}
          >
            Back
          </button>
          <button
            onClick={nextStep}
            className="bg-pink-500 text-white px-8 py-3 rounded-full text-xl font-bold hover:bg-pink-600 hover:scale-105 transition-transform"
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
    <div className="animate-fadeIn">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
        Sell Your Tickets Quickly
      </h1>

      {/* Search Input */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search by event"
          className="w-full px-6 py-4 border-2 border-gray-300 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400">
          🔍
        </span>
      </div>

      {/* Steps List */}
      <ul className="space-y-6 mb-6">
        <li className="flex items-start space-x-6">
          <span className="w-10 h-10 flex items-center justify-center bg-pink-500 text-white text-lg font-bold rounded-full">
            1
          </span>
          <p className="text-lg font-medium text-gray-700">
            Forward your Ticket mail
          </p>
        </li>
        <li className="flex items-start space-x-6">
          <span className="w-10 h-10 flex items-center justify-center bg-pink-500 text-white text-lg font-bold rounded-full">
            2
          </span>
          <p className="text-lg font-medium text-gray-700">
            Click <span className="font-semibold text-pink-500">“I’ve forwarded my tickets”</span> button
          </p>
        </li>
        <li className="flex items-start space-x-6">
          <span className="w-10 h-10 flex items-center justify-center bg-pink-500 text-white text-lg font-bold rounded-full">
            3
          </span>
          <p className="text-lg font-medium text-gray-700">
            Set your price and sell quickly
          </p>
        </li>
      </ul>

      {/* Create Event Section */}
      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
        <span className="text-gray-600 font-medium">Looking to organize an event?</span>
        <Link to="/create-event">
          <button className="bg-gray-800 text-white px-6 py-2 rounded-full text-base font-bold hover:bg-gray-700 transition">
            Create an Event
          </button>
        </Link>
      </div>
    </div>
  );
};

const Step2 = () => {
  return (
    <div className="animate-fadeIn">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
        Step 2: Confirm Details
      </h1>
      <p className="text-xl text-gray-600 text-center mb-6">
        Please confirm your ticket details and proceed.
      </p>

      {/* Example Details Section */}
      <div className="bg-gray-100 p-6 rounded-xl">
        <p className="text-lg text-gray-700 font-medium">Event: Music Concert</p>
        <p className="text-lg text-gray-700 font-medium">Date: February 14, 2025</p>
        <p className="text-lg text-gray-700 font-medium">Price: $50</p>
      </div>
    </div>
  );
};

export default ResellTickets;
