import { useJwt } from '../infra/jwt';
import { useDatabase } from '../infra/database';
import { Business } from '../types/business';
import { Token } from '../types/token';

export const authenticate = async (business: Business, username: string, password: string): Promise<Token> => {
    const { schemas } = useDatabase();

    const user = await schemas.User.findOne({ business: business.uuid, username, password });

    if (!user) throw new Error('Incorrect Credentials');

    const { sign } = useJwt(business.apiKey);

    const token = sign({ username: user.username, uuid: user._id.toString(), refId: user.refId });
    const refreshToken = sign({ uuid: user._id.toString() }, '24h');

    return {
        refreshToken,
        token,
    }
};
