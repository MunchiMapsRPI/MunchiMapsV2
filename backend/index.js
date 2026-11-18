require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
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
app.get('/api/', (req, res) => {
  res.send('API Server Running');
})

app.get('/api/getInfo', async (req, res) => {
  try {
    const info = await RPIModel.find();
    res.json(info);
  } catch (err) {
    console.error('Error fetching info:', err);
    res.status(500).json({ error: 'Failed to fetch info' });
  }
})

const FRONTEND_DIST_DIR = path.resolve(
  __dirname,
  process.env.FRONTEND_DIST_DIR || '../frontend/dist'
);

// Serve the Vite build from the configured website directory.
app.use(express.static(FRONTEND_DIST_DIR));
app.use((req, res) => {
  res.sendFile(path.join(FRONTEND_DIST_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
