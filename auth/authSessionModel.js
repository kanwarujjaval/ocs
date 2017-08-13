const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const validDevices = ['IOS', 'ANDROID', 'WEB'];

const authSessionSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            require: [true, 'Provide user Id for session'],
            index: true
        },
        valid: {
            type: Boolean,
            default: true,
            index: true
        },
        invalidedAt: {
            type: Date,
            default: null
        },
        ip: {
            type: String,
            default: null
        },
        deviceId: {
            type: String,
            default: null,
            index: true
        },
        deviceToken: {
            type: String,
            default: null
        },
        deviceType: {
            type: [String],
            validate: {
                validator: function (v) {
                    let isValid = 1;
                    v.map((d) => {
                        isValid *= validDevices.indexOf(d) > -1 ? 1 : 0;
                    });
                    return v.length > 0 && isValid;
                },
                message: 'Invalid Device'
            },
            required: [true, 'Device is required']
        }
    },
    {
        timestamps: true
    }
);

let authSessionModel = Mongoose.model('authSession', authSessionSchema);

module.exports = authSessionModel;
