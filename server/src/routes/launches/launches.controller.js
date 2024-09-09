import { getAllLaunches, scheduleNewLaunch, isExistsLaunchWithId, abortLaunchById } from '../../models/launches.model.js';
import { getPagination } from "../../services/query.js";

export const httpGetAllLaunches = async (req, res) => {
    const { skip, limit } = getPagination(req.query);
    const launches = await getAllLaunches(skip, limit);

    return res.status(200).json(launches);
};

export const httpAddNewLaunch = async (req, res) => {
    const launch = req.body;

    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.destination) {
        return res.status(400).json({
            error: 'Missing required launch property (mission, rocket, launchDate or destination)',
        });
    }

    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid launch date',
        });
    }

    await scheduleNewLaunch(launch);
    return res.status(201).json(launch); // created
};

export const httpAbortLaunch = async (req, res) => {
    const launchId = Number(req.params.id);
    const existsLaunch = await isExistsLaunchWithId(launchId);

    if (!existsLaunch) {
        return res.status(400).json({
            error: 'Launch not found',
        });
    }

    const aborted = await abortLaunchById(launchId);

    if (!aborted) {
        return res.status(400).json({
            error: 'Launch not aborted',
        })
    }
    return res.status(200).json({
        ok: true,
    });
};
