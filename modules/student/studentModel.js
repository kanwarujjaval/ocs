const Schema = Mongoose.Schema;

const studentSchema = new Schema({
  name        :   { type : String },
}, {
    timestamps : true
});

let studentModel = Mongoose.model('student', studentSchema);

module.exports = studentModel;