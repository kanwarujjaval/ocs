const Schema = Mongoose.Schema;

const parentSchema = new Schema({
  name        :   { type : String },
}, {
    timestamps : true
});

let parentModel = Mongoose.model('parent', parentSchema);

module.exports = parentModel;