import express from "express";
import cors from "cors";
import router from "./routes/user.route.js";
import ticketrouter from "./routes/ticket.route.js";
import razorpayRoutes from "./routes/razorpay.route.js";
import dotenv from "dotenv";
import expressSession from 'express-session'; // Import express-session
import cookieParser from 'cookie-parser';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const app = express();
const port = 8000;
app.use(cookieParser()); 

dotenv.config({ path: './.env' });

console.log(process.env.CORS_ORIGIN); // Optional logging, be cautious about sensitive data

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true,  // Allow credentials (cookies)
  methods: ['GET', 'POST']
  // allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Session management setup for Passport
app.use(expressSession({
  secret: process.env.SESSION_SECRET || 'fallback-secret',  // Use fallback in dev
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',  // Secure only in production
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24,
  },
}));

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "16kb" }));

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});


// Routes
app.use('/auth', router);
app.use("/ticket", ticketrouter);
app.use('/api/razorpay', razorpayRoutes);

// Server setup
export default app;
 