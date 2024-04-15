export const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X', rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  destination: 'Kepler-442 b',
  customers: ['NASA', 'COSMOS_30'],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

export const getAllLaunches = () => Array.from(launches.values());

export const addNewLaunch = (launch) => {
  latestFlightNumber++;
  launches.set(latestFlightNumber, Object.assign(launch, {
    flightNumber: latestFlightNumber,
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
  }));
};

//get launch Obj by flightNumber
//launches.get(100) // returns launch