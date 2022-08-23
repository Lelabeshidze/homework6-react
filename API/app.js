import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

// routes
import userRoutes from "./routes/users.js";

const app = express();
// general middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// route middlewares
app.use("/users", userRoutes);

dotenv.config();

const PORT = process.env.PORT || 5000;
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log(`server running on PORT=${PORT}`);
    });
  } catch (err) {
    console.log("error while starting", err);
  }
})();
