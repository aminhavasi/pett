const express = require('express');
const User = require('../models/user');
const router = express.Router();
const { registerValidator } = require('../validator/authValidator');
const moment = require('moment');
const { errorHandler } = require('./../helper/error');

const date = moment().format('YYYY/MM/DD');
router.post('/register', async (req, res) => {
    try {
        const { error } = await registerValidator(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const user = await User.find({
            $or: [{ email: req.body.email }, { username: req.body.username }],
        });
        if (!user.length > 0) {
            req.body.date = date;
            adminLevel = 'admin';
            const newUser = await new User(req.body);
            await newUser.save();
            res.status(201).send('successfully registred');
        } else {
            throw errorHandler(
                'A user is available with this email or username',
                1004
            );
        }
    } catch (err) {
        if (err.code === 1004) {
            res.status(400).send(err.message);
        } else {
            res.status(400).send('something went wrong');
        }
    }
});
module.exports = router;
