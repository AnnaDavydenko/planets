import { launches as launchesDatabase } from "./launches.mongo.js";
import { planets } from "./planets.mongo.js";

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X', 
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  destination: 'Kepler-442 b',
  customers: ['NASA', 'COSMOS_30'],
  upcoming: true,
  success: true,
};

export const isExistsLaunchWithId = async (launchId) => {
  return await launchesDatabase.findOne({
    flightNumber: launchId,
  });
};

const getLatestFlightNumber = async () => {
  const latestLaunch = await launchesDatabase
      .findOne({})
      .sort('-flightNumber')

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
};

export const getAllLaunches = async () => {
  return await launchesDatabase.find({}, {
    '_id': 0,
    '__v': 0,
  })
}

const saveLaunch = async (launch) => {
  const planet = await planets.findOne({
    keplerName: launch.destination,
  })

  if(!planet) {
    throw new Error(`No matching planet found: ${launch.destination}`);
  }

  await launchesDatabase.findOneAndUpdate({
    flightNumber: launch.flightNumber,
  }, launch, {
    upsert: true
  })
}

saveLaunch(launch)

export const scheduleNewLaunch = async (launch) => {
  const newFlightNumber = await getLatestFlightNumber();
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ['ZTM', 'NASA'],
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLaunch)
}

export const abortLaunchById = async (launchId) => {
  const aborted = await launchesDatabase.updateOne({
    flightNumber: launchId,
  }, {
    upcoming: false,
    success: false,
  })

  return aborted.modifiedCount === 1;
};
