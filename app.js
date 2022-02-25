const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Express app initialization
const app = express();

// Mongo Atlas Connection
const mongoURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.okfjq.mongodb.net/diary-db?retryWrites=true&w=majority`;
mongoose.connect(mongoURI, { useNewUrlParser : true, useUnifiedTopology: true})
.then((result) => {app.listen(process.env.PORT || 3000); console.log("Listening at 3000"); 
// Log to be removed
})
.catch((err) => console.log("Error Raised : ", err));

// Routing
const api = require('./api/api');
app.use('/api', api);
