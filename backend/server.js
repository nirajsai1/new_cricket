// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema and model (example: player schema)
const playerSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  category: String,
});

const Player = mongoose.model('Player', playerSchema);

// Define API routes
app.get('/api/players', async (req, res) => {
  const players = await Player.find();
  res.json(players);
});

app.post('/api/players', async (req, res) => {
  const player = new Player(req.body);
  await player.save();
  res.status(201).json(player);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
