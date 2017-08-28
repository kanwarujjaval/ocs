const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const batchSchema = new Schema(
    {
        organisationId: { type: Schema.Types.ObjectId, ref: 'organisation', required: true },
        name: { type: String },
        sections: [String]
    }, {
        timestamps: true
    });

let batchModel = Mongoose.model('batches', batchSchema);

module.exports = batchModel;
