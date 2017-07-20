const Schema = Mongoose.Schema;

const teacherSchema = new Schema({
  name        :   { type : String },
}, {
    timestamps : true
});

let teacherModel = Mongoose.model('teacher', teacherSchema);

module.exports = teacherModel;