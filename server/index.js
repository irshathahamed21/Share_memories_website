import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"

const app = express()

const postRoutes = require("./routes/posts")

app.use(bodyParser.json({limit:"30mb", extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}))
app.use(cors())


app.use("/posts", postRoutes)

const CONNECTION_URL = "mongodb://Irshath:ahamed@cluster0-shard-00-00.iwmdb.mongodb.net:27017,cluster0-shard-00-01.iwmdb.mongodb.net:27017,cluster0-shard-00-02.iwmdb.mongodb.net:27017/?ssl=true&replicaSet=atlas-7frgbf-shard-0&authSource=admin&retryWrites=true&w=majority"
const PORT = process.env.PORT || 5000


await mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => 
        console.log(`Server running on port: ${PORT}`) 
    ) )
    .catch((error) => console.log(error.message))


 
