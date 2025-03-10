import React, { useState, useEffect } from "react";
import { FaGlobe, FaClock, FaLock, FaMapMarkerAlt, FaVideo, FaCalendar } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateEvent() {
  const [entryFee, setEntryFee] = useState(1000);
  const [attendees, setAttendees] = useState(250);
  const [showForm, setShowForm] = useState(false);
  const [eventName, setEventName] = useState("");
  const [visibility, setVisibility] = useState("");
  const [eventType, setEventType] = useState("");
  const [step, setStep] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [eventLink, setEventLink] = useState("");

  // const isNextDisabled = !(startDate && startTime && endDate && endTime && eventLink && eventName && visibility && eventType);

  const calculateSavings = () => (entryFee * attendees * 0.1).toFixed(2);

  useEffect(() => {
    if (showForm) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showForm]);

  const isNextDisabled = !(eventName && visibility && eventType);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-pink-300 px-4 py-6 transition-all duration-300">
      <div className="text-sm font-semibold text-white bg-pink-500 px-5 py-2 rounded-full shadow-lg animate-bounce mb-8">
        Lowest fees in the market!
      </div>

      <h1 className="text-5xl font-extrabold text-center text-gray-800 leading-tight mb-8">
        Affordable Event <span className="text-pink-600">Ticketing</span> Platform
        <br /> tailored to your <span className="text-pink-600">needs</span>.
      </h1>

      <button
        className="mt-6 px-10 py-4 bg-pink-600 text-white text-2xl font-extrabold rounded-full shadow-lg hover:bg-pink-700 transition-transform transform hover:scale-110 mb-12"
        onClick={() => setShowForm(true)}
      >
        Create an Event
      </button>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full">
            {step === 1 ? (
              <>
                <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-left">
                  What’s your event about?
                </h2>

                <label className="block text-xl font-bold text-gray-700 mb-2">Event Name</label>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full p-4 border-2 rounded-lg text-xl font-semibold text-gray-800"
                  placeholder="Enter event name"
                  maxLength={50}
                />
                <p className="text-lg text-gray-500 mt-2 font-semibold">{eventName.length} / 50</p>

                <label className="block text-xl font-bold text-gray-700 mt-6">Visibility</label>
                <div className="flex space-x-4 mt-2">
                  <button
                    className={`flex items-center justify-center w-1/2 p-4 border-2 rounded-lg text-xl font-semibold 
                      ${visibility === "public" ? "bg-pink-500 text-white" : "text-gray-700"}`}
                    onClick={() => setVisibility(visibility === "public" ? "" : "public")}
                  >
                    <FaGlobe className="mr-2" /> Public
                  </button>
                  <button
                    className={`flex items-center justify-center w-1/2 p-4 border-2 rounded-lg text-xl font-semibold 
                      ${visibility === "private" ? "bg-pink-500 text-white" : "text-gray-700"}`}
                    onClick={() => setVisibility(visibility === "private" ? "" : "private")}
                  >
                    <FaLock className="mr-2" /> Private
                  </button>
                </div>

                <label className="block text-xl font-bold text-gray-700 mt-6">Event Type</label>
                <div className="flex space-x-4 mt-2">
                  <button
                    className={`flex items-center justify-center w-1/2 p-4 border-2 rounded-lg text-xl font-semibold 
                      ${eventType === "in-person" ? "bg-pink-500 text-white" : "text-gray-700"}`}
                    onClick={() => setEventType(eventType === "in-person" ? "" : "in-person")}
                  >
                    <FaMapMarkerAlt className="mr-2" /> In-Person
                  </button>
                  <button
                    className={`flex items-center justify-center w-1/2 p-4 border-2 rounded-lg text-xl font-semibold 
                      ${eventType === "online" ? "bg-pink-500 text-white" : "text-gray-700"}`}
                    onClick={() => setEventType(eventType === "online" ? "" : "online")}
                  >
                    <FaVideo className="mr-2" /> Online
                  </button>
                </div>

                <div className="flex justify-between mt-6">
                  <button className="text-pink-600 text-2xl font-bold hover:underline" onClick={() => setShowForm(false)}>
                    Back
                  </button>
                  <button
                    className={`px-8 py-3 text-2xl font-bold rounded-lg shadow-md transition-transform transform ${
                      isNextDisabled ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-pink-600 text-white hover:bg-pink-700 hover:scale-105"
                    }`}
                    disabled={isNextDisabled}
                    onClick={() => setStep(2)}
                  >
                    Next
                  </button>
                </div>
              </>
            ) :  (
              <>
                <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-left">When and where?</h2>
          
                {/* Date & Time Selection */}
                <label className="block text-xl font-bold text-gray-700">Date</label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {/* Start Date */}
                  <div className="p-4 border-2 rounded-lg flex items-center justify-between cursor-pointer">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      placeholderText="Select Start Date"
                      className="outline-none"
                    />
                    <FaCalendar />
                  </div>
          
                  {/* Start Time */}
                  <div className="p-4 border-2 rounded-lg flex items-center justify-between cursor-pointer">
                    <DatePicker
                      selected={startTime}
                      onChange={(time) => setStartTime(time)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      placeholderText="Select Start Time"
                      className="outline-none"
                    />
                    <FaClock />
                  </div>
          
                  {/* End Date */}
                  <div className="p-4 border-2 rounded-lg flex items-center justify-between cursor-pointer">
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      placeholderText="Select End Date"
                      className="outline-none"
                    />
                    <FaCalendar />
                  </div>
          
                  {/* End Time */}
                  <div className="p-4 border-2 rounded-lg flex items-center justify-between cursor-pointer">
                    <DatePicker
                      selected={endTime}
                      onChange={(time) => setEndTime(time)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      placeholderText="Select End Time"
                      className="outline-none"
                    />
                    <FaClock />
                  </div>
                </div>
          
                {/* Event Link */}
                <label className="block text-xl font-bold text-gray-700 mt-6">Event Link *</label>
                <input
                  type="text"
                  value={eventLink}
                  onChange={(e) => setEventLink(e.target.value)}
                  className="w-full p-4 border-2 rounded-lg text-xl font-semibold text-gray-800"
                  placeholder="Enter event link"
                />
          
                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                  <button className="text-pink-600 text-2xl font-bold hover:underline" onClick={() => setStep(1)}>
                    Back
                  </button>
                  <button
                    className={`px-8 py-3 text-2xl font-bold rounded-lg shadow-md transition-transform transform ${
                      isNextDisabled
                        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                        : "bg-pink-600 text-white hover:bg-pink-700 hover:scale-105"
                    }`}
                    disabled={isNextDisabled}
                    onClick={() => setStep(3)}
                  >
                    Next
                  </button>
                </div>
              </>)}
          </div>
        </div>
      )}

      {/* Added Section */}
      <div className="mt-12 flex items-center space-x-8">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-white border-4 border-pink-300 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-5xl font-bold text-pink-600">₹</span>
          </div>
          <p className="text-xl font-extrabold text-pink-700 mt-4">CHEAPEST FEES</p>
        </div>
      </div>

      <div className="mt-16 w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          Save <span className="text-pink-600">more</span> on event fees with us!
        </h2>

        <div className="space-y-8">
          <div>
            <label className="block text-xl font-extrabold text-gray-700 mb-2">Avg. Entry Fee</label>
            <input
              type="range"
              min="100"
              max="5000"
              value={entryFee}
              onChange={(e) => setEntryFee(Number(e.target.value))}
              className="w-full h-2 bg-pink-200 rounded-full cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xl font-extrabold text-gray-700 mb-2">Attendees Per Event</label>
            <input
              type="range"
              min="50"
              max="1000"
              value={attendees}
              onChange={(e) => setAttendees(Number(e.target.value))}
              className="w-full h-2 bg-pink-200 rounded-full cursor-pointer"
            />
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-2xl font-extrabold text-gray-700">
            Your potential savings: <span className="text-pink-600 font-bold">₹{calculateSavings()}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
