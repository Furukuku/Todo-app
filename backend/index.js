import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import todoRouter from "./routes/todoRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";

const app = express();

mongoose.connect(process.env.MONGDB_URL)
  .then(() => {
    console.log('Connected to mongodb.');
    app.listen(process.env.PORT, () => console.log('Running on port', process.env.PORT));
  })
  .catch(err => console.log('Failed connecting to database:', err));

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: [
    'Content-type',
    'Authorization'
  ]
}));

app.use('/api/todo', todoRouter);
app.use('/api/user', userRouter);