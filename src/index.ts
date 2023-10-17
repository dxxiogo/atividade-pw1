import express from 'express';
import {server} from './server/Server';
import { technologieRouter } from './routes/TechnologiesRouter';
import { userRouter } from './routes/UserRouter';



server.use(express.json())

server.listen(3333, () => console.log('Servidor rodando na porta 3333'));

server.use(technologieRouter);
server.use(userRouter);