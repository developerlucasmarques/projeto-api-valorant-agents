import {
    findAllAgentsService,
    findByIdAgentService,
    createAgentService,
    updateAgentService,
    deleteAgentService,
} from '../services/agents.service.js';

import { transformFirstLetter } from '../middlewares/agents.middlewares.js';

export const findAllAgentsController = async (req, res) => {
    try {
        res.status(200).send(await findAllAgentsService());
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const findByIdAgentController = async (req, res) => {
    try {
        res.status(200).send(await findByIdAgentService(req.params.id));
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const createAgentController = async (req, res) => {
    try {
        res.status(201).send(await createAgentService(req.body));
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const updateAgentController = async (req, res) => {
    try {
        res.status(200).send(await updateAgentService(req.params.id, req.body));
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const deleteAgentController = async (req, res) => {
    try {
        await deleteAgentService(req.params.id);
        res.status(200).send({
            message: `Agente deletado(a) com sucesso`,
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};
