const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter a valid email"],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    roles: {
        type: [{
            type: String,
            enum: ['user', 'admin']
        }],
        default: ['user']
    },
}, {
    timestamps: true 
})

userSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

const User = mongoose.model('user', userSchema);
module.exports = User