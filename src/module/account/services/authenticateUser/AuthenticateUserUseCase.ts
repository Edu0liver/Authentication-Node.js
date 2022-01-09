import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { IUsersRepository } from "module/account/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";


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
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({ email, password }: IRequest): Promise<IResponse>{
        const user = await this.usersRepository.findByEmail(email);
        const passwordMatch = compare(password, user.id);

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

        const authReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }

        return authReturn;
    }
}

export { AuthenticateUserUseCase };