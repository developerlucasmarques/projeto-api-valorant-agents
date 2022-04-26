import express from 'express';

import {
    findAllAgentsController,
    findByIdAgentController,
    createAgentController,
    updateAgentController,
    deleteAgentController,
} from '../controller/agents.controller.js';

import {
    validId,
    validObjectBody,
    validObjectBodyId,
    validObjectBodyName,
    validObjectBodyFunction,
    validAgentRegistered,
} from '../middlewares/agents.middlewares.js';

export const router = express.Router();

router.get('/find-all-agents', findAllAgentsController);
router.get('/find-one-agent/:id', validId, findByIdAgentController);
router.post(
    '/create-new-agent',
    validObjectBody,
    validObjectBodyId,
    validAgentRegistered,
    validObjectBodyName,
    validObjectBodyFunction,
    createAgentController,
);
router.put(
    '/update-one-agent/:id',
    validId,
    validObjectBody,
    validObjectBodyName,
    validObjectBodyFunction,
    updateAgentController,
);
router.delete('/delete-one-agent/:id', validId, deleteAgentController);
