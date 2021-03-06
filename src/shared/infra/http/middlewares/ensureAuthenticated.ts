import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersRepository } from '../../../../module/account/infra/typeorm/repositories/UsersRepository';

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    const authHeader = request.headers.authorization;   

    if(!authHeader){
        throw new Error("Token is missing !");
    }

    const [, token ] = authHeader.split(" ");

    try{
        const { sub: user_id } = verify(token, "123") as IPayload;

        request.user = {
            id: user_id
        }

        next();
    }catch{
        throw new Error("Token Invalid !");
    }
}