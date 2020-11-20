const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
    dateRegexValidator: regexValidator,
    usernamePattern,
} = require('./../helper/regex');
const Token = require('./tokens');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255,
    },

    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 255,
        validate: {
            validator: function (v) {
                return usernamePattern.test(v);
            },
        },
    },
    family: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
        maxlength: 255,
    },
    email: {
        type: String,
        unique: true,
        maxlength: 255,
        minlength: 5,
    },
    adminLevel: {
        type: String,
        default: 'admin',
        required: true,
        minlength: 5,
        maxlength: 8,
        enum: ['admin', 'employee', 'customer'],
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 1024,
        required: true,
    },
    date: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return regexValidator.test(v);
            },
        },
    },
    bornDate: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return regexValidator.test(v);
            },
        },
    },
});

userSchema.pre('save', function (next) {
    let user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

// userSchema.statics.findByCredentials = async function (body) {
//     let User = this;
//     let user = null;
//     if (body.email) {
//         user = await User.findOne({ email: body.email });
//     } else if (body.username) {
//         user = await User.findOne({ username: body.username });
//     }
//     if (!user) {
//         return Promise.reject('not');
//     }

//     return new Promise((resolve, reject) => {
//         bcrypt.compare(body.password, user.password, (err, res) => {
//             if (res) {
//                 resolve(user);
//             } else {
//                 reject('not');
//             }
//         });
//     });
// };

userSchema.methods.genAuthToken = function () {
    let user = this;
    let token = jwt
        .sign(
            { _id: user._id.toHexString(), access: user.adminLevel },
            process.env.JWT_CONF
        )
        .toString();

    const newToken = new Token({ user: user._id, token });
    newToken.save((err) => {
        if (err) return null;
    });
    return token;
};

userSchema.virtual('user', {
    ref: 'Token',
    localField: '_id',
    foreignField: 'user',
});

const User = mongoose.model('User', userSchema);
module.exports = User;
