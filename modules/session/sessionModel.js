const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const sessionSchema = new Schema({
    name: { type: String },
    organisationId: { type: Schema.Types.ObjectId },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    batchId: { type: String, required: true },
    section: { type: String, required: true },
    batchInfo: [{
        subjectId: { type: String, required: true },
        facultyId: { type: String, required: true },
    }],
    students: [String]
}, {
    timestamps: true
});

let sessionModel = Mongoose.model('session', sessionSchema);

module.exports = sessionModel;
