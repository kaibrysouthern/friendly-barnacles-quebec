require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb')
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
//run().catch(console.dir);

async function cxnDB(){

  try{
    client.connect; 
    const collection = client.db("kaibrys-papa-database").collection("dev-profiles");
    // const collection = client.db("papa").collection("dev-profiles");
    const result = await collection.find().toArray();
    //const result = await collection.findOne(); 
    console.log("cxnDB result: ", result);
    return result; 
  }
  catch(e){
      console.log(e)
  }
  finally{
    client.close; 
  }
}

app.get('/', async (req, res) => {

  let result = await cxnDB().catch(console.error); 

  // console.log("get/: ", result);
  res.send("here for a sec: " + result[0].name);
  //res.render('index', {  peopleData : result })
})




app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

let myVariableServer = "soft coded server data";

app.get('/view', function (req, res) {
  res.render('index', 
  {
    'myVariableClient': myVariableServer
  });
})

app.post('/postClientData', function (req, res) {
  console.log("body: ", req.body)
   console.log("user Name: ", req.body.userName)
  //  console.log("params: ", req.params['userName']);

  //myVariableServer = "now we have posted"

  res.render('index', 
  {
    'myVariableClient': req.body.userName 
  });
})

app.get('/', function (req, res) {
  res.send('Hello World From Express and a Paas/Render' )
})

app.get('/whatever', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})


app.listen(4500);