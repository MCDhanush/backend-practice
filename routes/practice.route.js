import { client } from "../index.js";
import express from "express"
import { ObjectId } from "mongodb";
const router= express.Router()

router.get("/", async function (req, res) {
    console.log(req.query);
    const datas = await client.db("practice-data").collection("data").find({}).toArray();
    res.send(datas);
});


router.get("/:id",async function(req,res){
    const {id} = req.params;
    console.log(id);
    const result = await client.db("practice-data").collection("data").findOne({_id:new ObjectId(id)})
    console.log(result)
    result ? res.send(result):res.status(404).send({message : "data not found"})
})

router.put("/:id",async function(req,res){
    const {id} = req.params
    console.log(id)
    const data = req.body
    const result =await client.db("practice-data").collection("data").updateOne({_id:new ObjectId(id)},{$set:data})
    console.log(result)
    result ? res.send(result) : res.status(404).send({message:"Invaild token"})
})



router.post("/",async function(req,res){
    const datas = req.body
    console.log(datas)
    const result =await client.db("practice-data").collection("data").insertOne(datas)
    res.send(result)
})

router.delete("/:id",async function(req,res){
 const {id} = req.params
 console.log(id)
 const data =await client.db("practice-data").collection("data").deleteOne({_id:new ObjectId(id)})
 data ? res.send({data}) : res.status(404).send({message:"invalid token"})
})

export default router