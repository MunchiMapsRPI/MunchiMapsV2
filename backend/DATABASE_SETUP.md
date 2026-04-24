# MunchiMaps Database Architecture

## Overview
The backend now uses MongoDB to store building/machine information collected with photos. The initial setup creates nodes for all 7 buildings with confirmed photo collections.

## Initialized Buildings
The following buildings have been set up as nodes in the MongoDB database with their photo collection status:

- **BARH** - 3 photos (Food + Drink)
- **DCC-WRPI** - 1 photo (Drink)
- **ECAV** - 2 photos (Drink)
- **FOLSOM** - 3 photos (Food + Drink)
- **JROWL** - 2 photos (Food + Drink)
- **UNION** - 5 photos (Food + Drink)
- **VCC** - 3 photos (Food + Drink)

## Building Schema

Each building document contains:

```javascript
{
  buildingCode: String (unique, required),        // e.g., "BARH"
  name: String,                                   // Full name (optional)
  location: {
    latitude: Number,
    longitude: Number
  },
  description: String,
  photosCollected: {
    hasFood: Boolean,
    hasDrink: Boolean,
    photoCount: Number
  },
  collectStatus: String,                          // photos_collected, info_needed, complete
  infoNeeded: {
    cuisineType: String,
    operatingHours: String,
    contactInfo: String,
    website: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Get All Buildings
```
GET /api/buildings
```
Returns all building documents with complete information.

### Get Single Building
```
GET /api/buildings/:code
```
Returns a specific building by code (e.g., `/api/buildings/BARH`).

### Update Building Information
```
PUT /api/buildings/:code
```
Update building info. Example request body:
```json
{
  "name": "Blackwell Hall",
  "location": {
    "latitude": 42.360091,
    "longitude": -71.096619
  },
  "infoNeeded": {
    "cuisineType": "Asian",
    "operatingHours": "10am - 10pm",
    "contactInfo": "617-555-1234",
    "website": "example.com"
  }
}
```

### Get Buildings Summary
```
GET /api/buildings-summary
```
Returns lightweight summary of all buildings (code, name, status, photo info).

## Setup Instructions

1. **Set Environment Variables**: Create a `.env` file in the `/backend` directory with your MongoDB connection string:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/munchiMaps?retryWrites=true&w=majority
   PORT=5000
   ```

2. **Start the Server**:
   ```
   cd backend
   npm install
   npm start
   ```

3. **Database Initialization**: The database will automatically initialize on first server startup, creating building nodes for all 7 machines with collected photos.

## Next Steps

You can now:
- Add building metadata (names, locations, operating hours, etc.)
- Track information collection status
- Manage photo associations with buildings
- Expand with additional features as needed
