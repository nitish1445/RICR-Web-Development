import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./src/config/db.js";
import AuthRouter from "./src/routers/myRouter.js"

const app = express();

app.use(express.json());
app.use("/auth",AuthRouter);

app.get("/", (req, res) => {
  console.log("Server is loading......");
  res.json({ message: "Serever is Running Successfully" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Serever started at port", port);
  connectDB();
});
