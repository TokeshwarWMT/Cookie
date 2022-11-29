const User = require('../models/user');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

router.post('/register', async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.status(201).json(user)
    } catch (error) {
        return res.json(error)
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send('Please input credentials')
        };
        const user = await User.findOne({ email: email });
        if (!email) {
            return res.status(400).send('Email is incorrect')
        }
        const token = jwt.sign({
            id: user._id
        }, 'webmobtech', { expiresIn: '1h' })
        return res
            .cookie('jwt', token, {
                httpOnly: true,
                secure: true,
            })
            .status(201)
            .json({ success: true, data: token })

    } catch (error) {
        return res.status(500).send(error)
    }
});

router.get('/logout', async (req, res) => {
    try {
        return res
            .clearCookie('jwt')
            .status(200)
            .json({ message: 'successfully logout' })
    } catch (error) {
        return res.status(500).send(error)
    }
});

router.get('/getUser/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById({ _id: id })
        return res.status(200).send(user)
    } catch (error) {
        return res.status(500).send(error)
    }
});

module.exports = router;