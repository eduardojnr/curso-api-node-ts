import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

interface ICidade {
    nome: string;
}

const bodyValidation: yup.Schema<ICidade> = yup.object().shape({
    nome: yup.string().required().min(3),
    estado: yup.string().required().min(3),
});

// Define a função Create que recebe um Request e um Response
// Define a tipagem através de um interface
export const Create = async (req: Request<{}, {}, {ICidade}>, res: Response) => {
    let validatedData: ICidade | undefined = undefined;

    try { // Valida todo o corpo da requisição
        await bodyValidation.validate(req.body, { abortEarly: false }); // abortEarly: false para retornar todos os erros de uma vez
    } catch (error) {
        const yupError = error as yup.ValidationError;
        const errors: Record<string, string> = {};

        yupError.inner.forEach(error => {
            if (error.path === undefined) return;
            errors[error.path] = error.message;
        })

        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {default: errors}
        });
    }

    console.log(validatedData);

};