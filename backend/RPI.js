const mongoose = require('mongoose')

const RPISchema = new mongoose.Schema({
    image: String
})

const RPIModel = mongoose.model("machine_info", RPISchema, "machine_info");
module.exports = RPIModel