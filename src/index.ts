import dotenv from 'dotenv'
dotenv.config()

import express, { json } from "express";
import { globalErrorHandler } from "./middlewares/handlers/GlobalErrorHandler";
import './db/index'
import UserRouter from "./api/UserRouter";
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

// Initialize socket connection
// const socket = initializeSocket();

// JSON Parser Middleware
app.use(json());
app.use(cors({
    origin: ['*'],
}));

// Routers Middleware
app.use('/user', UserRouter);

// Error Hadler Middleware
app.use(globalErrorHandler);

app.listen(port, () => {
    console.log('ENV:' + process.env.NODE_ENV);
    console.log('Server listening on port: ' + port);
})