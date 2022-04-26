import { Agents } from '../models/Agents.js';

export const findAllAgentsService = async () => {
    try {
        return await Agents.find();
    } catch (err) {
        return err.message;
    }
};

export const findByIdAgentService = async (idParams) => {
    try {
        return await Agents.findById(idParams);
    } catch (err) {
        return err.message;
    }
};

export const createAgentService = async (reqBody) => {
    try {
        return await Agents.create(reqBody);
    } catch (err) {
        return err.message;
    }
};

export const updateAgentService = async (idParams, reqBody) => {
    try {
        const newAgent = await Agents.findByIdAndUpdate(idParams, reqBody);
        return reqBody;
    } catch (err) {
        return err.message;
    }
};

export const deleteAgentService = async (idParams) => {
    try {
        return await Agents.findByIdAndDelete(idParams);
    } catch (err) {
        return err.message;
    }
};
