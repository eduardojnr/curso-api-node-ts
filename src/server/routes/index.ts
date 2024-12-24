import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.get('/home', (_, res) => {
    return res.send('Olá DEV!');
});

router.post('/teste', (req, res) => {
    console.log(req);

    // return res.send('Teste de atualização');
    return res.status(StatusCodes.UNAUTHORIZED).json(req.body);
});

export { router }