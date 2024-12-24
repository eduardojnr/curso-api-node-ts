import { server } from './server/Server';
require('dotenv').config();


server.listen(process.env.PORT || 3333, () => console.log(`App rodando na porta: ${process.env.PORT}`));
