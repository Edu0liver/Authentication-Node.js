import { sign, verify } from 'jsonwebtoken';
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository';
import { inject, injectable } from 'tsyringe';

interface IPayload {
    sub: string;
    email: string;
}
interface ITokenResponse {
    token: string;
    refresh_token: string;
}

@injectable()
class RefreshTokenService {

    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository
    ){}

    async execute(refresh_token: string): Promise<ITokenResponse> {
        const { email, sub: user_id } = verify(refresh_token, "123") as IPayload;

        const userToken = await this.usersTokensRepository.findByRefreshToken(refresh_token);

        if(!userToken){
            throw new Error("Refresh token not found");
        }

        await this.usersTokensRepository.deleteById(userToken.id);

        const newRefreshToken = sign({email}, "123", {
            subject: user_id,
            expiresIn: "1d"
        })

        await this.usersTokensRepository.create({
            user_id,
            refresh_token: newRefreshToken,
            expires_date: new Date()
        })

        const newToken = sign({}, "123", {
            subject: user_id,
            expiresIn: "1d"
        });

        return {
            token: newToken,
            refresh_token: newRefreshToken
        }
    }
}

export { RefreshTokenService }