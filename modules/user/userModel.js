const Schema = Mongoose.Schema;

const userSchema = new Schema({
  name      :   String,
  phoneNo   :   { type : String, required : true },
  email     :   String
},{
    timestamps : true
});

let UserModel = Mongoose.model('user', userSchema);

module.exports = UserModel;