const Schema = Mongoose.Schema;

const sessionSchema = new Schema({
  name        :   { type : String },
  startTime   :   { type : Date, required : true },
  endTime     :   { type : Date, required : true },
  batch       :   { 
    batchId      : { type : String, required : true },
    subjectId    : { type : String, required : true },
    facultyId    : { type : String, required : true },
    section      : { type : String, required : true },
  },
  students : [String],
}, {
    timestamps : true
});

let sessionModel = Mongoose.model('session', sessionSchema);

module.exports = sessionModel;