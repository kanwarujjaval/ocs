const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const subjectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    books: [{
        title: { type: String, required: true },
        author: { type: String, required: true }
    }]
}, {
    timestamps: true
});

let subjectModel = Mongoose.model('subject', subjectSchema);

module.exports = subjectModel;
