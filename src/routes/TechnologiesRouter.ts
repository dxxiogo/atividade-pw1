import { Router } from "express";
import { getTechnologie, getTechnologies, createTechnologie, updateTechnologie, deleteTechnologie, updateStudiedStatus } from "../controllers/TechnologiesController";
import { checkUserExist } from '../services/middlewares/CheckUserExists';

const technologieRouter = Router();

technologieRouter.use('/technologie', checkUserExist);

technologieRouter.get('/technologie', getTechnologies);

technologieRouter.get('/technologie/:id', getTechnologie);

technologieRouter.post('/technologie', createTechnologie);

technologieRouter.put('/technologie/:id',updateTechnologie);

technologieRouter.delete('/technologie/:id', deleteTechnologie);

technologieRouter.patch('/technologie/:id/studied', updateStudiedStatus )

export {technologieRouter};