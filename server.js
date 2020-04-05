const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const app = express();

mongoose.connect(process.env.DATABASE_CLOUD, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB started'))
    .catch(err => console.log(err))

//aply middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors({origin: process.env.CLIENT_URL}));

app.use('/api', authRoutes);
app.use('/api', userRoutes);

const port = process.env.PORT || 2000;
app.listen(port, () => console.log(`API is running on port ${port}`));
