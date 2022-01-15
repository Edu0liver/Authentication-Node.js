import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";


class UsersRepository implements IUsersRepository {

    private users: User[] = [];

    async create({ name, email, password }: ICreateUserDTO): Promise<void> {
        const user = new User();

        Object.assign(user, {
            name,
            email,
            password
        });

        this.users.push(user);
    }

    async findById(id: string): Promise<User> {
        const user = this.users.find(user=> user.id === id);
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = this.users.find(user=> user.email === email);
        return user;
    }
    
}

export { UsersRepository }