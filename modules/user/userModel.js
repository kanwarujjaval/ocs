const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const validRoles = ['ADMIN', 'TEACHER', 'PARENT', 'STUDENT', 'STAFF'];

const studentSchema = new Schema({
    rollNo: { type: String, required: true }
});

const facultySchema = new Schema({
    specialization: { type: String, required: true }
});

// const parentSchema = new Schema({
//   childId: { type: Schema.Types.ObjectId, required: true }
// })

const userSchema = new Schema({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    phoneNo: { type: String, required: true, index: true, unique: true },
    email: { type: String, required: true, index: true, unique: true },
    address: String,
    city: { type: String, required: true },
    country: { type: String, required: true },
    role: {
        type: [String],
        validate: {
            validator: function (v) {
                let isValid = 1;
                v.map((role) => {
                    isValid *= validRoles.indexOf(role) > -1 ? 1 : 0;
                });
                return v.length > 0 && isValid;
            },
            message: 'Invalid Role'
        },
        required: [true, 'User\'s role is required']
    },
    studentData: {type: studentSchema, required: false},
    facultyData: {type: facultySchema, required: false}
}, {
    timestamps: true
});

let UserModel = Mongoose.model('user', userSchema);

module.exports = UserModel;
