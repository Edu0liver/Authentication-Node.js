import { UsersRepository } from "../../module/account/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "../../module/account/repositories/IUsersRepository";
import { container } from "tsyringe";
import { UsersTokensRepository } from "module/account/infra/typeorm/repositories/UsersTokensRepository";
import { IUsersTokensRepository } from "module/account/repositories/IUsersTokensRepository";


container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<IUsersTokensRepository>(
    "UsersTokensRepository",
    UsersTokensRepository
);