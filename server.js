const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routers/userRouter');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: "https://storybanaao.netlify.app", // Corrected CORS origin
    credentials: true // Allows cookies if needed
}));  

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Route Middleware
app.use('/api/users', userRouter);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000 // Helps prevent long connection delays
})
.then(() => app.listen(PORT, () => console.log(`DB connected & Server running on port ${PORT}`)))
.catch(err => console.error("MongoDB connection error:", err));
