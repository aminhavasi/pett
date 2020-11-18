const express = require('express');
const User = require('../models/user');
const router = express.Router();
const persianDate = require('persian-date');

persianDate.toLocale('en');
const date = new persianDate().format('YYYY/M/DD');
router.post('/register', async (req, res) => {
    console.log(req.body);
    res.status(200).send('salam alaykom');
    // try {
    //     const user = {
    //         name: 'amin',
    //         family: 'havasi',
    //         username: 'amin_offline',
    //         email: 'amin@gmail.com',
    //         adminLevel: 'customer',
    //         password: '123456789',
    //         date: '1375/7/24',
    //         bornDate: '1375/7/24',
    //     };
    //     const newUser = await new User(user);
    //     await newUser.save();
    //     res.send('ok');
    // } catch (err) {
    //     console.log(err);
    //     res.status(400).send('err');
    // }
});
module.exports = router;
