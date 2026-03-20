require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const RPIModel = require('./RPI');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// Connect to database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to database!'))
  .catch(err => console.error('Could not connect to database...', err));

// Connection test
app.get('/', (req, res) => {
  res.send('API Server Running');
})

app.get('/getMachines', async (req, res) => {
  try {
    const machines = await RPIModel.find();
    res.json(machines);
  } catch (err) {
    console.error('Error fetching machines:', err);
    res.status(500).json({ error: 'Failed to fetch machines' });
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
