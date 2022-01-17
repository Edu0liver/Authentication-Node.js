import { verify } from 'jsonwebtoken';
import { IUsersTokensRepository } from '';
import { injectable } from 'tsyringe';

interface ITokenResponse {
    token: string;
    refresh_token: string;
}

@injectable()
class RefreshTokenService {

    constructor(
        private usersTokensRepository: IUsersTokensRepository
    ){}

    async execute(token: string): Promise<ITokenResponse> {
        const { sub: user_id , email } = verify(token, "123");

        const 
    }
}

export { RefreshTokenService }