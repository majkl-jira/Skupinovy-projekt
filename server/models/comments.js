const mongoose = require("mongoose")

const schema = mongoose.Schema({
    comment: {type: String,required: true}
})

module.exports = mongoose.model("Comment", schema)