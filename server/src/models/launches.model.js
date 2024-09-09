import { launches as launchesDatabase } from "./launches.mongo.js";
import { planets } from "./planets.mongo.js";
import axios from "axios";

const DEFAULT_FLIGHT_NUMBER = 100;
const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

export const findLaunch = async (filter) => {
  return await launchesDatabase.findOne(filter);
};

export const isExistsLaunchWithId = async (launchId) => {
  return await findLaunch({
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

export const getAllLaunches = async (skip, limit) => {
  return await launchesDatabase
    .find({}, { '_id': 0, '__v': 0 })
    .sort({ flightNumber: 1 }) //ASC
    .skip(skip)
    .limit(limit);
}

const saveLaunch = async (launch) => {
  await launchesDatabase.findOneAndUpdate({
    flightNumber: launch.flightNumber,
  }, launch, {
    upsert: true
  })
}

export const populateLaunches = async () => {
  console.log('Downloading launch data...');

  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [{
        path: 'rocket',
        select: {
          name: 1
        }
      },
        {
          path: 'payloads',
          select: {
            'customers': 1
          }
        }
      ]
    }
  });

  if (response.status !== 200) {
    console.log('Error occured while downloading launches...');
    throw new Error('Launch data downloading failed');
  }

  const launchDocs = response.data.docs;

  for (const launchDoc of launchDocs) {
    const payloads = launchDoc['payloads'];
    const customers = payloads.flatMap((payload) => payload['customers']);

    const launch = {
      flightNumber: launchDoc['flight_number'],
      mission: launchDoc['name'],
      rocket: launchDoc['rocket']['name'],
      launchDate: launchDoc['date_local'],
      upcoming: launchDoc['upcoming'],
      success: launchDoc['success'],
      customers,
    };

    console.log(`${launch.flightNumber} ${launch.mission}`);

    await saveLaunch(launch);
  }
}

export const loadLaunchData = async (launch) => {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: 'Falcon 1',
    mission: 'FalconSat',
  });

  if (firstLaunch) {
    console.log('Launch data already loaded!');
  } else {
    await populateLaunches();
  }
}

export const scheduleNewLaunch = async (launch) => {
  const planet = await planets.findOne({
    keplerName: launch.destination,
  })

  if(!planet) {
    throw new Error(`No matching planet found: ${launch.destination}`);
  }

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
