import { getAllLaunches, addNewLaunch } from '../../models/launches.model.js';

export const httpGetAllLaunches = (req, res) => {
  // for (const value of launches.values()) {...}
  return res.status(200).json(getAllLaunches())
}

export const httpAddNewLaunch = (req, res) => {
  const launch = req.body;
  
  if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.destination) {
    return res.status(400).json({
      error:'Missing required launch property (mission, rocket, launchDate or destination)'
    });
  }
  
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error:'Invalid launch date'
    });
  }

  addNewLaunch(launch);
  return res.status(201).json(launch); // created
}