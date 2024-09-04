// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import connectDB from './db/db.js';
import Player from './models/player.model.js';
import PlayerRoutes from './routes/playerRoute.js'

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/players',PlayerRoutes)
app.listen(port, () => {
  connectDB()
  console.log(`Server running at http://localhost:${port}`);
});
