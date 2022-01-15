import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {
    create({ name, email, password }: ICreateUserDTO): Promise<void>;
    findById(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
}

export { IUsersRepository }