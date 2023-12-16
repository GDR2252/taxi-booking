import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();

const databaseURI = process.env.MONGO_URI as any;

mongoose.connect(databaseURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
} as any);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongoose connected to " + databaseURI);
});

connection.on("error", (err) => {
  console.error("Mongoose connection error: " + err);
});

connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});

process.on("SIGINT", () => {
  mongoose.connection.close().then(() => {
    console.log("Mongoose connection disconnected through app termination");
    process.exit(0);
  });
});
