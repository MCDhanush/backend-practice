import express from "express"
import { MongoClient} from "mongodb";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import practiceRoute from "./routes/practice.route.js"
import * as dotenv from "dotenv"
dotenv.config()

export const app = express();
const PORT = process.env.PORT;
app.use(express.json())

app.get("/", function (request, response) {
    response.send("🙋‍♂️, 🌏 🎊🤩");
});

const MONGO_URL = process.env.MONGO_URL
const client = new MongoClient(MONGO_URL)
await client.connect() // top level await we use await anywhere
console.log("Mongo is connected 👍");

app.use("/practice",practiceRoute)


async function getHashedPassword(password){
    const NO_OF_ROUNDS = 10;
    const salt = await bcrypt.genSalt(NO_OF_ROUNDS)
    const hashedPassword = await bcrypt.hash(password,salt)
    return hashedPassword
}

app.post("/signup",async function(req,res){
const{username,password}= req.body
console.log(password)

const userFromDB = await client.db("practice-data").collection("users").findOne({username:username})
console.log(userFromDB)
if(userFromDB){ //1
    res.status(404).send({message:"user already exits"})
}else if(password.lenght < 8){ //2
    res.status(401).send({message:"password must be 8 character"})
}else{
    const hashedPassword =await getHashedPassword(password) //3.1
    console.log(password,hashedPassword);

const result = await client.db("practice-data").collection("users").insertOne({  //3.2
    username :username,
    password: hashedPassword
})
res.send(result)

}})


app.post("/login",async function(req,res){
    const {username,password} = req.body
    // console.log(password)
   
    const userFromDB =await client.db("practice-data").collection("users").findOne({username:username})
    console.log(userFromDB,password)
    if(!userFromDB){
        res.status(404).send({message:"Invalid user"})
    }else{
        const sortedDBPassword = userFromDB.password
        const isPasswordMatch = await bcrypt.compare(password,sortedDBPassword)
        console.log(sortedDBPassword)
        if(isPasswordMatch){
            const token = jwt.sign({id:userFromDB._id},process.env.SECRECT_KEY)
            res.send({message:"succesfully logined",token:token})
        }else{
            res.status(401).send({message:"invalid credantials"})
        }
    }

})























app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

export{client}