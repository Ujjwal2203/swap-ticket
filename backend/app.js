import express from "express"
import cors from "cors"
import userrouter from "./routes/user.route.js"
import ticketrouter from "./routes/ticket.route.js"
const app = express();
const port = 8000;


import dotenv from "dotenv"

dotenv.config({path : './.env'})
console.log(process.env.CORS_ORIGIN)
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
  }))

  
  app.use(express.urlencoded({ extended: true })) 
  
  app.use(express.json(
    {
      limit:"16kb"
    }
  ))
  
app.use("/auth", userrouter)
app.use("/ticket", ticketrouter)


export default app