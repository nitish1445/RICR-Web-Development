import express from "express";
import cors from "cors";
import cloudinary from "./src/config/cloudinary.js";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js";
import AuthRouter from "./src/routers/authRouter.js";
import PublicRouter from "./src/routers/publicRouter.js";
import morgan from "morgan";
import UserRouter from "./src/routers/userRouter.js";
import RestaurantRouter from "./src/routers/restaurantRouter.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/auth", AuthRouter);
app.use("/public", PublicRouter);
app.use("/user", UserRouter);
app.use("/restaurant", RestaurantRouter);

app.get("/", (req, res) => {
  console.log("Server is working");
});

app.use((err, req, res, next) => {
  const ErrorMessage = err.message || "Internal Server Error";
  const StatusCode = err.statusCode || 500;
  console.log("Error Found", { ErrorMessage, StatusCode });

  res.status(StatusCode).json({ message: ErrorMessage });
});

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  console.log("Server started at port: ", port);
  connectDB();
  try {
    const res = await cloudinary.api.ping();
    console.log("Cloudinary API is working : ", res);
  } catch (error) {
    console.error("Error connecting cloudinary API : ", error);
  }
});

// const startServer = async () => {
//   try {
//     // connect the server
//     await connectDB();
//     // starts server after checking db is connected
//     app.listen(port, () => {
//       console.log("Server started at port:", port);
//     });
//   } catch (error) {
//     // if db not connected
//     console.log("DB connection failed:", error);
//   }
// };

// startServer();
