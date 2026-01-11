import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./src/config/db.js";
import AuthRouter from "./src/routers/myRouter.js";

const app = express();

app.use(express.json());
app.use("/auth", AuthRouter);

app.get("/", (req, res) => {
  console.log("Server is loading......");
  res.json({ message: "Serever is Running Successfully" });
});

app.use((err, req, res, next) => {
  const errorMessage = err.message || "Internal Server Error";
  const StatusCode = err.statusCode;

  res.status(StatusCode).json({ message: errorMessage });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Serever started at port", port);
  connectDB();
});
