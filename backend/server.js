import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import { getConn } from "./Database/connectDB.js";
import authRoutes from "./Routes/authRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import errorMiddleware from "./Middleware/errorMiddleware.js";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
import cors from "cors";
import cookieParser from "cookie-parser";
//Env Variable
dotenv.config();

//Sql Connection
getConn();

//express
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//Cloudinary Config
cloudinary.v2.config({
  cloud_name: "dj20jrfpz",
  api_key: "666476814384184",
  api_secret: "LdHj7Bw8pTVwfDMLwg2vX16o0J4",
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

app.use(errorMiddleware);
const Port = process.env.PORT;

app.listen(Port, () => {
  console.log(`Server Started at Port ${Port}`.bgMagenta);
});
