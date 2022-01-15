import { UsersRepository } from "../../module/account/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "../../module/account/repositories/IUsersRepository";
import { container } from "tsyringe";


container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);