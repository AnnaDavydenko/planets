import { parse } from 'csv-parse';
import fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { planets } from "./planets.mongo.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

export const loadPlanetsData = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
      .pipe(parse({
        comment: '#',
        columns: true,
      }))
      .on('data', async (data) => {
        if (isHabitablePlanet(data)) {
          await savePlanet(data);
        }
      })
      .on('error', (err) => {
        console.log(err);
        reject(err);
      })
      .on('end', async () => {
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(`${countPlanetsFound} habitable planets found!`);
        resolve();
      });
  });
};

const savePlanet = async (planet) => {
  try {
    await planets.updateOne({
      keplerName: planet["keplerName"],
    }, {
      keplerName: planet["keplerName"],
    }, {
      upsert: true,
    });
  } catch (e) {
    console.error(`Couldn't save planet: ${e}`);
  }

}

export const getAllPlanets = async () => {
  return planets.find({});
}
