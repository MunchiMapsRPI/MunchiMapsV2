const mongoose = require('mongoose');
const Building = require('./models/Building');

// Buildings with photos collected
const buildingsData = [
  {
    buildingCode: 'BARH',
    photosCollected: {
      hasFood: true,
      hasDrink: true,
      photoCount: 3
    }
  },
  {
    buildingCode: 'DCC-WRPI',
    photosCollected: {
      hasFood: false,
      hasDrink: true,
      photoCount: 1
    }
  },
  {
    buildingCode: 'ECAV',
    photosCollected: {
      hasFood: false,
      hasDrink: true,
      photoCount: 2
    }
  },
  {
    buildingCode: 'FOLSOM',
    photosCollected: {
      hasFood: true,
      hasDrink: true,
      photoCount: 3
    }
  },
  {
    buildingCode: 'JROWL',
    photosCollected: {
      hasFood: true,
      hasDrink: true,
      photoCount: 2
    }
  },
  {
    buildingCode: 'UNION',
    photosCollected: {
      hasFood: true,
      hasDrink: true,
      photoCount: 5
    }
  },
  {
    buildingCode: 'VCC',
    photosCollected: {
      hasFood: true,
      hasDrink: true,
      photoCount: 3
    }
  }
];

async function initializeDatabase() {
  try {
    // Check if buildings already exist
    const existingCount = await Building.countDocuments();
    
    if (existingCount === 0) {
      console.log('Initializing database with building nodes...');
      
      const createdBuildings = await Building.insertMany(buildingsData);
      console.log(`✓ Created ${createdBuildings.length} building nodes`);
      
      createdBuildings.forEach(building => {
        console.log(`  - ${building.buildingCode}: ${building.photosCollected.photoCount} photos collected`);
      });
    } else {
      console.log(`Database already initialized with ${existingCount} buildings`);
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

module.exports = initializeDatabase;
