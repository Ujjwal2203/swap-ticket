import { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { MyListingsContext } from "../MyListingsContext";
import toast from "react-hot-toast";

const MovieForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movie = location.state?.movie;
  const { listings = [], removeListing } = useContext(MyListingsContext);

  useEffect(() => {
    console.log("Selected movie:", movie);
    console.log("Available listings:", listings);
  }, [movie, listings]);

  if (!movie) {
    return <div className="text-center text-gray-600">No movie selected.</div>;
  }

  console.log("Selected movie ID:", movie.id);
  console.log("Listings available:", listings);

  // Filter movie listings based on movie id
  const movieListings = listings.filter(
    (listing) => listing.movie.id === movie.id
  );

  console.log("Filtered movie listings:", movieListings);

  const loadRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Handle buying a ticket
  const handleBuyTicket = async (ticket) => {
    const res = await loadRazorpay(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Failed to load Razorpay. Check your internet connection.");
      return;
    }

    try {
      const { data: order } = await axios.post(
        "http://localhost:8000/api/razorpay/create-order",
        { amount: ticket.price },
        { withCredentials: true }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Ticket Purchase",
        description: "Purchase event ticket",
        order_id: order.id,
        handler: async function (response) {
          // Send payment details to backend for verification
          try {
            const verifyRes = await axios.post(
              "http://localhost:8000/api/razorpay/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                ticket,
              },
              { withCredentials: true }
            );

            if (verifyRes.data.success) {
              toast.success("🎉 Payment successful!");
              removeListing(ticket);
              setTimeout(() => {
                navigate("/thank-you");
              }, 1500);
            } else {
              alert("⚠️ Payment verification failed.");
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("An error occurred during verification.");
          }
        },
        prefill: {
          name: "Guest User", // update with real user info if available
          email: "guest@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#f43f5e",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Failed to initiate payment.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-100 to-gray-300 p-8">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-4xl w-full flex items-center gap-8">
        {/* Movie Image */}
        <div className="w-1/2 rounded-lg overflow-hidden shadow-md">
          <img
            src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
            alt={movie.title || movie.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Event Details */}
        <div className="w-1/2 flex flex-col justify-center text-left">
          <h1 className="text-4xl font-extrabold text-gray-800">
            {movie.title || movie.name}
          </h1>
          <p className="text-lg font-semibold text-gray-600 mt-2">
            📅{" "}
            {new Date(
              movie.release_date || movie.first_air_date
            ).toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>

          {/* Tickets Section */}
          <div className="mt-6">
            {movieListings.length > 0 ? (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-green-700">
                  🎫 Tickets Available
                </h2>
                {movieListings.map((ticket, index) => (
                  <div
                    key={index}
                    className="p-4 bg-green-100 rounded-lg flex justify-between items-center shadow"
                  >
                    <div>
                      <p className="text-gray-800 font-semibold">
                        Seat: {ticket.seat || "General"}
                      </p>
                      <p className="text-gray-700">Price: ₹{ticket.price}</p>
                    </div>
                    <button
                      onClick={() => handleBuyTicket(ticket)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition"
                    >
                      Buy Now
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-gray-200 rounded-lg">
                <span className="text-lg font-bold text-gray-700">
                  ❌ No Tickets Available
                </span>
              </div>
            )}
          </div>

          {/* Sell Tickets Section */}
          <div className="mt-6 p-4 bg-red-100 rounded-lg flex flex-col items-center shadow-md">
            <span className="text-lg font-bold text-red-700">
              🎫 Got Tickets to Sell?
            </span>
            <p className="text-gray-700 text-center mt-2">
              List your tickets now and sell them fast.
            </p>
            <button
              className="mt-3 px-6 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition"
              onClick={() => navigate("/resell-tickets")}
            >
              Sell Tickets
            </button>
          </div>

          {/* Back Button */}
          <div className="mt-6">
            <button
              className="bg-gray-700 text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-gray-900 transition"
              onClick={() => navigate(-1)}
            >
              🔙 Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieForm;
