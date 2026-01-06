import dotenv from "dotenv";
dotenv.config();
import express from "express";

const app = express();
app.get("/", (req, res) => {
  console.log("Server is loading......");
  res.json({ message: "Serever is Running Successfully" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Serever started at port", port);
});
