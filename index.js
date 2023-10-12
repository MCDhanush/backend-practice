import express from "express";
import { MongoClient } from "mongodb";
import practiceRoute from "./routes/practice.route.js";
import * as dotenv from "dotenv";
dotenv.config();

export const app = express();
const PORT = process.env.PORT;
app.use(express.json());

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊🤩");
});

const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);
await client.connect(); // top level await we use await anywhere
console.log("Mongo is connected 👍");

app.use("/practice", practiceRoute);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

export { client };
