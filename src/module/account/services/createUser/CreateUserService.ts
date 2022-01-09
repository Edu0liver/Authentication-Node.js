import { hash } from 'bcrypt';
import { ICreateUserDTO } from 'module/account/dtos/ICreateUserDTO';
import { IUsersRepository } from 'module/account/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateUserService {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({ name, email, password }: ICreateUserDTO): Promise<void>{
        const userExists = await this.usersRepository.findByEmail(email);

        if(userExists){
            throw new Error("User already exists");
        }

        const passwordHash = await hash(password, 12);

        await this.usersRepository.create({
            name,
            email,
            password: passwordHash
        });
    }
}

export { CreateUserService }