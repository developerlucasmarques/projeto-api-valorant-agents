import fetch from 'node-fetch';
import mongoose from 'mongoose';
import { Agents } from '../models/Agents.js';
const agentsNames = [];
const agentesFunctions = ['Sentinela', 'Iniciador', 'Controlador', 'Duelista'];

const searchAgentsApi = async () => {
    try {
        const agentsApi = await fetch('https://valorant-api.com/v1/agents');
        const agentsList = await agentsApi.json();
        const agentListData = await agentsList.data;
        for (let i of agentListData) {
            agentsNames.push(i.displayName);
        }
    } catch (err) {
        console.log(err.message);
    }
};
searchAgentsApi();

export const transformFirstLetter = (recBody) => {
    let string = recBody;
    string = string[0].toUpperCase() + string.slice(1).toLowerCase();
    return string;
};

export const validId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).send({ message: 'Id inválido!' });
    }
    next();
};

export const validObjectBody = (req, res, next) => {
    if (
        !req.body.name ||
        !req.body.function ||
        !req.body.biography ||
        !req.body.skills ||
        !req.body.image
    ) {
        return res
            .status(400)
            .send({ message: 'Envie todos os campos preenchidos!' });
    }
    next();
};

export const validObjectBodyId = (req, res, next) => {
    if (req.body.id || req.body._id) {
        return res.status(400).send({ message: 'Não envie o campo ID.' });
    }
    next();
};

export const validObjectBodyName = async (req, res, next) => {
    try {
        req.body.name = transformFirstLetter(req.body.name);
        let validArrayName = false;
        for (let i = 0; i < agentsNames.length; i++) {
            if (!validArrayName) {
                if (req.body.name == agentsNames[i]) {
                    validArrayName = true;
                }
            }
        }
        if (!validArrayName) {
            return res.status(400).send({
                message: `${req.body.name} não é um agente do Valorant. Cadestre um agente real.`,
            });
        }
        next();
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const validObjectBodyFunction = (req, res, next) => {
    req.body.function = transformFirstLetter(req.body.function);
    let validArrayFunction = false;
    for (let i = 0; i < agentesFunctions.length; i++) {
        if (!validArrayFunction) {
            if (req.body.function == agentesFunctions[i]) {
                validArrayFunction = true;
            }
        }
    }
    if (!validArrayFunction) {
        return res.status(400).send({
            message: `${req.body.function} não é uma função de um agente. Cadestre uma função real.`,
        });
    }
    next();
};

export const validAgentRegistered = async (req, res, next) => {
    try {
        req.body.name = transformFirstLetter(req.body.name);
        const namesAllAgentsRegistered = [];
        const allAgents = await Agents.find();
        let validNamesRegistered = false;

        for (let i of allAgents) {
            namesAllAgentsRegistered.push(i.name);
        }
        for (let i = 0; i < namesAllAgentsRegistered.length; i++) {
            if (!validNamesRegistered) {
                if (req.body.name == namesAllAgentsRegistered[i]) {
                    validNamesRegistered = true;
                }
            }
        }
        if (validNamesRegistered) {
            return res.status(400).send({
                message: `${req.body.name} já foi registrado, registre um novo agente.`,
            });
        }
        next();
    } catch (err) {
        res.satus(500).send(err.message);
    }
};
