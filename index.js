// SETUP EXPRESS
const express = require('express');
const cors = require('cors');
const mongodb = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const MongoClient = mongodb.MongoClient;
const dotenv = require('dotenv');
dotenv.config();

let app = express();
app.use(express.json());
app.use(cors());

// connect to the Mongo DB
async function connect() {
    const mongo_url = process.env.MONGO_URI;
    let client = await MongoClient.connect(mongo_url, {
        "useUnifiedTopology": true
    })
    let db = client.db("image-gallery");
    console.log("database connected");
    return db;
}

// ROUTES

async function main() {
    let db = await connect();
 

    app.post('/images', async (req, res) => {
        let results = await db.collection('images').insertOne({
            name: req.body.name,
            url: req.body.url
        })
        res.json(results);
    })

   
}


main();

// START SERVER
// note: we set port to 8888 so it won't clash with React
app.listen(8888, () => {
    console.log("server has started")
})