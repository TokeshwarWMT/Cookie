const jwt = require('jsonwebtoken');

const authentication = async (req, res, next) => {
    try {
        const token = req.headers['x-api-key'];
        if (!token) {
            return res.status(400).send('Please input token');
        };
        const decodedToken = jwt.verify('webmobtech', token, (error, result) => {
            if (!error) {
                return res.status(403).send('Please input valid token')
            }
        });
        next()
    } catch (error) {
        return res.status(500).send(error)
    }
};

module.exports = authentication;