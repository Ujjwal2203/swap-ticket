import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true, // Ensures a ticket has an owner
    },
    movieId: {
      type: String, // Assuming movie ID from external API (like TMDB)
      required: true, 
    },
    movieTitle: {
      type: String, 
      required: true, // Movie title for display
    },
    numberOfTickets: {
      type: Number,
      required: true,
      default: 1, // Default to 1 ticket if not specified
    },
    availableTickets: {
      type: Number,
      required: true,
      default: 1, // Initially, all tickets are available
    },
    date: {
      type: String, // Date when tickets are available
      required: true,
    },
    time: {
      type: String, // Time of the event or movie screening
      required: true,
    },
    price: {
      type: Number, // Price per ticket
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "confirm", "reject"],
      default: "pending", // Initially, the ticket status is pending
    },
    description: {
      type: String, // Optional field for any additional details about the ticket
      default: "",
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export const Ticket = mongoose.model("Ticket", ticketSchema);
