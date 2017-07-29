const Schema = Mongoose.Schema;

const organisationSchema = new Schema({
    name: { type: String, required: true },
    phoneNo: { type: String, required: true, index: true, unique: true },
    email: { type: String, required: true, index: true, unique: true },
    address: String,
    city: { type: String, required: true },
    country: { type: String, required: true },
    registeredBy: { type: Schema.Types.ObjectId, required: true }
}, {
        timestamps: true
    });

let organisationModel = Mongoose.model('organisation', organisationSchema);

module.exports = organisationModel;