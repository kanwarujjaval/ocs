const Schema = Mongoose.Schema;

const userSchema = new Schema({
  name        :   String,
  phoneNo     :   { type : String, required : true , index : true, unique : true},
  email       :   { type : String, required : true , index : true, unique : true},
  address     :   String,
  role        :   ['string']
},{
    timestamps : true
});

let UserModel = Mongoose.model('user', userSchema);

module.exports = UserModel;