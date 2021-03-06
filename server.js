const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const linkRoutes = require('./routes/link');
const app = express();

mongoose.connect(process.env.DATABASE_CLOUD, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log('DB started'))
    .catch(err => console.log(err))

//aply middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb', type: 'application/json', }));
app.use(cors({origin: process.env.CLIENT_URL}));

// routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', linkRoutes);

const port = process.env.PORT || 2000;
app.listen(port, () => console.log(`API is running on port ${port}`));
