const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.static('public'));
app.use(express.json());

// 1. Connection
mongoose.connect('mongodb://127.0.0.1:27017/photostudio')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB Error:", err));

// 2. USER SCHEMA (For Signup & Login)
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// 3. BOOKING SCHEMA
const bookingSchema = new mongoose.Schema({
    photographerName: String,
    customerName: String,
    customerEmail: String,
    bookingDate: String,
    createdAt: { type: Date, default: Date.now }
});
const Booking = mongoose.model('Booking', bookingSchema);

// --- ROUTES ---

// NEW: SIGNUP ROUTE
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }
        
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(200).json({ message: "Account created successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error during signup" });
    }
});

// UPDATED: LOGIN ROUTE (Checks Database)
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });

        if (user) {
            res.status(200).json({ message: "Success" });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (err) {
        res.status(500).json({ message: "Login error" });
    }
});

// BOOKING ROUTE
app.post('/api/book', async (req, res) => {
    try {
        const newBooking = new Booking(req.body); 
        await newBooking.save();
        res.status(200).json({ message: "Saved" });
    } catch (err) {
        res.status(500).json({ message: "Failed to save booking" });
    }
});

app.listen(3000, () => console.log("Server: http://localhost:3000"));