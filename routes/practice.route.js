import { client } from "../index.js";
import express from "express";
import { ObjectId } from "mongodb";
const router = express.Router();

// /movies - display all movie data
// while sending - converts to JSON
router.get("/", async function (req, res) {
  // db.movies.find({ language : "tamil" , name : "Vikram" })  // gets movie from local
  console.log(req.query);
  const datas = await client
    .db("practice-data")
    .collection("data")
    .find({})
    .toArray();
  res.send(datas);
});

// /movies/:id
router.get("/:id", async function (req, res) {
  const { id } = req.params;
  // use find instead of filter to get only object
  console.log(id);
  const result = await client
    .db("practice-data")
    .collection("data")
    .findOne({ _id: new ObjectId(id) });
  console.log(result);
  result
    ? res.send(result)
    : res.status(404).send({ message: "data not found" });
});

// update
router.put("/:id", async function (req, res) {
  const { id } = req.params;
  console.log(id);
  const data = req.body;
  //   db.movies.updatOne({id:"103"})
  // const movie = movies.find((mv) => mv.id == id)
  const result = await client
    .db("practice-data")
    .collection("data")
    .updateOne({ _id: new ObjectId(id) }, { $set: data });
  console.log(result);
  result
    ? res.send(result)
    : res.status(404).send({ message: "Invaild token" });
});

// Create
router.post("/", async function (req, res) {
  const datas = req.body;
  console.log(datas);
  // db.movies.insertOne(data)
  const result = await client
    .db("practice-data")
    .collection("data")
    .insertOne(datas);
  res.send(result);
});

// delete
router.delete("/:id", async function (req, res) {
  const { id } = req.params;
  console.log(id);
  // db.movies.deletone(data)({id:101})
  const data = await client
    .db("practice-data")
    .collection("data")
    .deleteOne({ id: id });
  data
    ? res.send({ data })
    : res.status(404).send({ message: "invalid token" });
});

export default router;
