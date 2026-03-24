const mongoose = require('mongoose');

const buildingSchema = new mongoose.Schema({
  buildingCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  },
  name: {
    type: String,
    default: null
  },
  location: {
    latitude: {
      type: Number,
      default: null
    },
    longitude: {
      type: Number,
      default: null
    }
  },
  description: {
    type: String,
    default: null
  },
  photosCollected: {
    hasFood: {
      type: Boolean,
      default: false
    },
    hasDrink: {
      type: Boolean,
      default: false
    },
    photoCount: {
      type: Number,
      default: 0
    }
  },
  collectStatus: {
    type: String,
    enum: ['photos_collected', 'info_needed', 'complete'],
    default: 'photos_collected'
  },
  infoNeeded: {
    cuisineType: {
      type: String,
      default: null
    },
    operatingHours: {
      type: String,
      default: null
    },
    contactInfo: {
      type: String,
      default: null
    },
    website: {
      type: String,
      default: null
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Building', buildingSchema);
