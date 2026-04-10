require("dotenv").config();
const express = require("express");
const connectDB = require("./src/db/db");
const app = express();
const cookieParser = require("cookie-parser")
const authRoutes = require("./src/Routes/auth.routes")
const musicRoutes = require('./src/Routes/music.routes')


app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/music', musicRoutes);


connectDB();


app.listen(3000,()=>{
    console.log("Server is running on PORT 3000")
})