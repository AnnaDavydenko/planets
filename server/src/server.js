import http from 'http';
import { app } from './app.js';
import { loadPlanetsData } from './models/planets.model.js';
import { mongoConnect } from "./services/mongo.js";
import { loadLaunchData } from "./models/launches.model.js";
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await loadPlanetsData();
  await loadLaunchData();

  server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}...`);
  });
}

startServer();
