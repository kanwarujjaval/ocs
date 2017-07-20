const Schema = Mongoose.Schema;

const staffSchema = new Schema({
  name        :   { type : String },
}, {
    timestamps : true
});

let staffModel = Mongoose.model('staff', staffSchema);

module.exports = staffModel;