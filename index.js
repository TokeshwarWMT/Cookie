const express = require('express');
const app = express();
const mongoose = require('mongoose');
const user = require('./controllers/user');

app.use(express.json());
app.use('/', user);

mongoose.connect('mongodb+srv://Satyaveer1994:Satyaveer123@cluster0.pn1nk.mongodb.net/Cookie')
    .then(() => console.log('MongoDB successfully connected'))
    .catch((e) => console.log(e))

app.listen(3000, () => {
    console.log('Server is running on port 3000')
});