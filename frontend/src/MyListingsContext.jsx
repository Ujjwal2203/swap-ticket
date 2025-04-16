import { createContext, useContext, useState } from "react";

export const MyListingsContext = createContext();

export const MyListingsProvider = ({ children }) => {
  const [listings, setListings] = useState([]);

  const addListing = (newTicket) => {
    setListings((prevListings) => [...prevListings, newTicket]);
  };

  const removeListing = (ticketToRemove) => {
    setListings((prev) =>
      prev.filter(
        (ticket) =>
          ticket.movie.id !== ticketToRemove.movie.id ||
          ticket.price !== ticketToRemove.price ||
          ticket.seat !== ticketToRemove.seat
      )
    );
  };

  return (
    <MyListingsContext.Provider value={{ listings, addListing ,removeListing}}>
      {children}
    </MyListingsContext.Provider>
  );
};

export const useMyListingsContext = () => useContext(MyListingsContext);
