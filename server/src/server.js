import http from 'http';
import { app } from './app.js';
import { loadPlanetsData } from './models/planets.model.js';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 8000;
const MONGO_URL = 'mongodb+srv://hannaworkaccout:34274TXruB5jaEnD@nasacluster.3kjv2vd.mongodb.net/?retryWrites=true&w=majority&appName=NASACluster';
const server = http.createServer(app);

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});
mongoose.connection.on('error', (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}...`);
  });
}

startServer();


