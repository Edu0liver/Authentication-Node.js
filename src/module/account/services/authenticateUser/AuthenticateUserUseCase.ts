import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";


interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    token: string;
    user: {
        name: string;
        email: string;
    };
    refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository
    ){}

    async execute({ email, password }: IRequest): Promise<IResponse>{
        const user = await this.usersRepository.findByEmail(email);
        const passwordMatch = compare(password, user.password);

        if(!user){
            throw new Error("Email or Password is incorrect!");
        }

        if(!passwordMatch){
            throw new Error("Email or Password is incorrect!");
        }

        const token = sign({}, "123", {
            subject: user.id,
            expiresIn: "1d"
        })

        const refresh_token = sign({ email }, "123", {
            subject: user.id,
            expiresIn: "1d"
        })

        await this.usersTokensRepository.create({
            user_id: user.id,
            refresh_token,
            expires_date: new Date
        })

        const authReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            },
            refresh_token
        }

        return authReturn;
    }
}

export { AuthenticateUserUseCase };