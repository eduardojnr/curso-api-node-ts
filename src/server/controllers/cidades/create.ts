import { Request, Response, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

interface ICidade {
    nome: string;
    estado: string;
}

const bodyValidation: yup.Schema<ICidade> = yup.object().shape({
    nome: yup.string().required().min(3),
    estado: yup.string().required().min(3),
});

// Middleware para validar o corpo da requisição
export const createBodyValidator: RequestHandler = async (req, res, next) => {
    try { // Valida todo o corpo da requisição
        await bodyValidation.validate(req.body, { abortEarly: false }); // abortEarly: false para retornar todos os erros de uma vez
        return next();

    } catch (error) {
        const yupError = error as yup.ValidationError;
        const errors: Record<string, string> = {};

        yupError.inner.forEach(error => {
            if (error.path === undefined) return;
            errors[error.path] = error.message;
        })

        return res.status(StatusCodes.BAD_REQUEST).json({errors: {default: errors}});
    }
}


interface IFilter{
    filter?: string;
}

const queryValidation: yup.Schema<IFilter> = yup.object().shape({
    filter: yup.string().required().min(3),
});

export const createQueryValidator: RequestHandler = async (req, res, next) => {
    try { // Valida todo o corpo da requisição
        await queryValidation.validate(req.query, { abortEarly: false }); // abortEarly: false para retornar todos os erros de uma vez
        return next();

    } catch (error) {
        const yupError = error as yup.ValidationError;
        const errors: Record<string, string> = {};

        yupError.inner.forEach(error => {
            if (error.path === undefined) return;
            errors[error.path] = error.message;
        })

        return res.status(StatusCodes.BAD_REQUEST).json({errors: {default: errors}});
    }
}


// Define a função Create que recebe um Request e um Response
// Define a tipagem através de um interface
export const Create = async (req: Request<{}, {}, {ICidade}>, res: Response) => {
    console.log(req.body);

    return res.send('Create!');

};