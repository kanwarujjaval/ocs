const Schema = Mongoose.Schema;

const courseSchema = new Schema({
  name        :   { type : String },
}, {
    timestamps : true
});

let courseModel = Mongoose.model('course', courseSchema);

module.exports = courseModel;