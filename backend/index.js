require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const initializeDatabase = require('./initDatabase');
const Building = require('./models/Building');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to database
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to database!');
    // Initialize database with buildings
    await initializeDatabase();
  })
  .catch(err => console.error('Could not connect to database...', err));

// Connection test
app.get('/', (req, res) => {
  res.send('MunchiMaps API Server Running');
});

// Get all buildings
app.get('/api/buildings', async (req, res) => {
  try {
    const buildings = await Building.find();
    res.json(buildings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single building by code
app.get('/api/buildings/:code', async (req, res) => {
  try {
    const building = await Building.findOne({ buildingCode: req.params.code.toUpperCase() });
    if (!building) {
      return res.status(404).json({ error: 'Building not found' });
    }
    res.json(building);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update building info
app.put('/api/buildings/:code', async (req, res) => {
  try {
    const building = await Building.findOneAndUpdate(
      { buildingCode: req.params.code.toUpperCase() },
      req.body,
      { new: true, runValidators: true }
    );
    if (!building) {
      return res.status(404).json({ error: 'Building not found' });
    }
    res.json(building);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get buildings summary
app.get('/api/buildings-summary', async (req, res) => {
  try {
    const buildings = await Building.find({}, 'buildingCode name collectStatus photosCollected');
    res.json(buildings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
