const Schema = Mongoose.Schema;

const batchSchema = new Schema({
  name        :   { type : String },
}, {
    timestamps : true
});

let batchModel = Mongoose.model('batch', batchSchema);

module.exports = batchModel;