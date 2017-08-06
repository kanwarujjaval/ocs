const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const batchSchema = new Schema({
  name        :   { type : String },
  sections    :   [String]
}, {
    timestamps : true
});

let batchModel = Mongoose.model('batch', batchSchema);

module.exports = batchModel;