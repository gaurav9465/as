const express = require('express');
const dbConnect = require('./mongodb');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

// Define a route to fetch data
app.use(express.json());
app.get('/getdata', async (req, res) => {
  try {
    const collection = await dbConnect();
    const result = await collection.find().toArray();
    res.send(result);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post('/insertdata', async (req, res) => {
    try {
      console.log('Received data:', req.body); // Log received data
      const { name, email, city } = req.body; // Extract fields from req.body
      const collection = await dbConnect();
      const insertedData = await collection.insertOne({ name, email, city }); // Insert only specified fields
      res.send("Data Inserted Successfully");
    } catch (error) {
      console.error("Error inserting data:", error);
      res.status(500).send("Internal Server Error");
    }
});

  

  app.put('/updatedata/:name', async (req, res) => {
    try {
      const { name } = req.params;
      const newData = req.body;
  
      const collection = await dbConnect();
      const updatedData = await collection.findOneAndUpdate(
        { name: name },
        { $set: newData },
        { returnOriginal: false }
      );
      res.send("Data Updated Successfully");
    } catch (error) {
      console.error("Error updating data:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  app.delete('/deletedata/:name', async (req, res) => {
    try {
      const { name } = req.params;
  
      const collection = await dbConnect();
      const deletionResult = await collection.deleteOne({ name: name });
  
      if (deletionResult.deletedCount === 0) {
        return res.status(404).send("Data not found");
      }
  
      res.send("Data Deleted Successfully");
    } catch (error) {
      console.error("Error deleting data:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
