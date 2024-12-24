import './shared/services/TranslationsYup'
import express from 'express';
import { router } from './routes';
import './shared/services/TranslationsYup'


const server = express();
server.use(express.json());
server.use(router);
 

export { server };