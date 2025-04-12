import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from './Routes/User.route.js';
import connectdb from './db/connectdb.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;

connectdb();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Use the user routes only once
app.use("/tuneshelf/users", userRoutes);

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})