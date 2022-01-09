import { ICreateUserDTO } from "module/account/dtos/ICreateUserDTO";
import { User } from "module/account/infra/orm/entities/User";

interface IUsersRepository {
    create({ name, email, password }: ICreateUserDTO): Promise<void>;
    findById(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
}

export { IUsersRepository }