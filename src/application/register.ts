import { useDatabase } from '../infra/database';
import { Business } from '../types/business';
import { User, UserNoPass } from '../types/user';

export const register = async (business: Business, user: Omit<User, 'uuid'>): Promise<UserNoPass> => {
    const { schemas: { User } } = useDatabase();

    const created = await User.create({
        business: business.uuid,
        password: user.password,
        username: user.username,
        refId: user.refId,
    });

    return {
        uuid: created._id.toString(),
        username: created.username,
        refId: created.refId,
    }
};
