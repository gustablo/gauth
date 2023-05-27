import { useDatabase } from '../infra/database';
import { useJwt } from '../infra/jwt';
import { RefreshTokenPayload } from '../types/token';
import { Business } from '../types/business';

export const refresh = async (business: Business, refreshToken: string) => {
    const { verify, sign } = useJwt(business.apiKey);
    const { schemas } = useDatabase();

    const verified = await verify<RefreshTokenPayload>(refreshToken);

    const user = await schemas.User.findById(verified.uuid);

    if (!user) throw new Error('User not found');

    const newToken = sign({ username: user.username, uuid: user._id.toString(), refId: user.refId });

    return {
        token: newToken,
    }
};
