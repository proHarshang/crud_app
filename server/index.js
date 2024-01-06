import express from "express";
import { mongoDBURL } from './config.js';
import mongoose from 'mongoose'
import user_route from './routes/user_route.js';
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.use(cors());

app.use('/users', user_route);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("connected to DB");
        app.listen(3001, () => {
            console.log("Running on 3001");
        })
    }).catch((err) => {
        console.log(err);
    });