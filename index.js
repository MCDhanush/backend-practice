import express from "express";
import { MongoClient } from "mongodb";
import practiceRoute from "./routes/practice.route.js";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();
// console.log(process.env);  // evn -> environment variables

// STEP-2
export const app = express();
const PORT = process.env.PORT;
app.use(express.json());

// STEP-3
// const PORT = 4503;
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊🤩");
});

// last step 3rd party CORS Middleware
app.use(cors());

const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);
await client.connect(); // top level await we use await anywhere
console.log("Mongo is connected 👍");

app.use("/practice", practiceRoute);

// STEP-4
app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

export { client };
