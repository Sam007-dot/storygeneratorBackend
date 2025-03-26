const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routers/userRouter');
require('dotenv').config();
const planRoutes = require("./routers/planRoutes");
const querryRoutes = require("./routers/querryRoutes")
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'https://tutorji.netlify.app'
  }));  
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/users', userRouter);


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Db connected & Server running on port ${PORT}`)))
    .catch(err => console.log(err));
