import React, { useState } from "react";

export default function CreateEvent() {
  const [entryFee, setEntryFee] = useState(1000);
  const [attendees, setAttendees] = useState(250);

  const calculateSavings = () => {
    const savings = (entryFee * attendees * 0.1).toFixed(2); // Example calculation: 10% savings
    return savings;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-pink-300">
      <div className="text-sm font-medium text-white bg-pink-500 px-5 py-2 rounded-full shadow-lg animate-bounce mb-6">
        Lowest fees in the market!
      </div>
      <h1 className="text-6xl font-extrabold text-center text-gray-800 leading-tight">
        Affordable Event <span className="text-pink-600">Ticketing</span> Platform
        <br /> tailored to your <span className="text-pink-600">needs</span>.
      </h1>
      <button className="mt-8 px-8 py-4 bg-pink-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-pink-700 transition-transform transform hover:scale-105">
        Create an Event
      </button>
      <div className="mt-12 flex items-center space-x-8">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-white border-4 border-pink-300 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-5xl font-bold text-pink-600">₹</span>
          </div>
          <p className="text-md font-semibold text-pink-700 mt-4">CHEAPEST FEES</p>
        </div>
      </div>

      {/* Savings Section */}
      <div className="mt-16 w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Save <span className="text-pink-600">more</span> on event fees with us!
        </h2>
        <div className="flex justify-end mb-4">
          <button className="px-6 py-2 border border-gray-400 text-gray-800 rounded-full hover:bg-gray-100 transition">
            Calculate your savings
          </button>
        </div>
        <div className="space-y-8">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Avg. Entry Fee</label>
            <input
              type="range"
              min="100"
              max="5000"
              value={entryFee}
              onChange={(e) => setEntryFee(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-gray-600 mt-2">
              <span>₹100</span>
              <span>₹{entryFee}</span>
            </div>
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Attendees Per Event</label>
            <input
              type="range"
              min="50"
              max="1000"
              value={attendees}
              onChange={(e) => setAttendees(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-gray-600 mt-2">
              <span>50</span>
              <span>{attendees}</span>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-xl font-medium text-gray-700">
            Your potential savings: <span className="text-pink-600 font-bold">₹{calculateSavings()}</span>
          </p>
        </div>
      </div>

      {/* Earnings Comparison Section */}
      <div className="mt-16 w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { platform: "TakeMyTickets", earning: 77616, savings: 7056, isPositive: true },
          { platform: "BookMyShow", earning: 70560, savings: -7056, isPositive: false },
          { platform: "Paytm Insider", earning: 68992, savings: -8624, isPositive: false },
        ].map(({ platform, earning, savings, isPositive }, idx) => (
          <div
            key={idx}
            className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 transform transition-transform hover:scale-105 hover:shadow-2xl"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">{platform}</h3>
            <p className="text-2xl font-semibold text-gray-700 mb-2">
              You earn <span className={isPositive ? "text-green-500" : "text-red-500"}>₹{earning}</span>
            </p>
            <p
              className={`text-sm font-medium px-4 py-2 rounded-full inline-block ${
                isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
              }`}
            >
              {isPositive
                ? `You save ₹${Math.abs(savings)}`
                : `₹${Math.abs(savings)} extra in fees`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
