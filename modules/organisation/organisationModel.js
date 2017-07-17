const Schema = Mongoose.Schema;

const organisationSchema = new Schema({
  name        :   String,
  phoneNo     :   { type : String, required : true , index : true, unique : true},
  email       :   { type : String, required : true , index : true, unique : true},
  address     :   String,
  role        :   ['string']
},{
    timestamps : true
});

let organisationModel = Mongoose.model('organisation', organisationSchema);

module.exports = organisationModel;