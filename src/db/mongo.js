const mongoose = require('mongoose');
const db = () => {
    mongoose.connect(process.env.URI, {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useNewUrlParser: true,
    });
};

module.exports = db;
