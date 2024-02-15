import { getAllLaunches } from '../../models/launches.model.js';

export const httpGetAllLaunches = (req, res) => {
  // for (const value of launches.values()) {...}
  return res.status(200).json(getAllLaunches())
}