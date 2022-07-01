const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


// Middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.MongoDB_User}:${process.env.MongoDB_Pass}@cluster0.oheyy.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run(){
    try{
        await client.connect();
        const DailyTaskAdded = client.db('DailyTask').collection('new_task');
        

// #######-----------------------------  insert Daily Task Data Start  -----------------------------####### //
    app.post('/new_task', async(req, res) => {
        const task = req.body;
        const result = await DailyTaskAdded.insertOne(task);
        res.send({success: true, result});
    })
// #######-----------------------------  insert Daily Task Data End  -----------------------------####### //


// #######-----------------------------  Get Daily Task Data Start  -----------------------------####### //
app.get('/new_task', async(req, res) => {
    const query ={};
    const cursor = DailyTaskAdded.find(query);
    const allTask = await cursor.toArray();
    res.send(allTask);
  });
// #######-----------------------------  Get Daily Task Data End  -----------------------------####### //


// #######-----------------------------  Get Daily Task Data Start  -----------------------------####### //
    app.get('/new_task/:id', async(req, res) =>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const task = await DailyTaskAdded.findOne(query);
        res.send(task);
      })
// #######-----------------------------  Get Daily Task Data End  -----------------------------####### //



// #######-----------------------------  Get Daily Task Data End  -----------------------------####### //
app.put('/new_task/:id', async (req, res) => {
    const id = req.params.id;
    const new_task = req.body;
    const filter = {_id: ObjectId(id)};
    const options = {upsert: true};
    const updateDoc = {
        $set: new_task,
    };
    const result = await DailyTaskAdded.updateOne(filter, updateDoc, options);
    res.send(result);
})
// #######-----------------------------  Get Daily Task Data End  -----------------------------####### //


// #######-----------------------------  Get Daily Task Data End  -----------------------------####### //
app.delete('/new_task/:id', async(req, res) => {
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const result = await DailyTaskAdded.deleteOne(query);
    res.send(result);
  })
// #######-----------------------------  Get Daily Task Data End  -----------------------------####### //


        
}
    finally{

    }

}
run().catch(console.dir);






app.get('/', (req, res) => {
    res.send('Running Task Server')
})

app.listen(port, () => {
    console.log('listening Port')
})