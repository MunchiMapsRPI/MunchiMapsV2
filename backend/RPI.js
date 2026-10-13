const mongoose = require('mongoose')

const RPISchema = new mongoose.Schema({
    image: String,
    location: 
    {
        building: String,
        geolocation: 
        {
            type: { type: String },
            coordinates: [Number]
        },
        opening_times: 
        {
            0: { 0: String, 1: String },
            1: { 0: String, 1: String },
            2: { 0: String, 1: String },
            3: { 0: String, 1: String },
            4: { 0: String, 1: String },
            5: { 0: String, 1: String },
            6: { 0: String, 1: String }
        }
    },
    contents: String,
})

const RPIModel = mongoose.model("machine_info", RPISchema, "machine_info");
module.exports = RPIModel