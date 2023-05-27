import { authenticate } from './authenticate';
import { register } from './register';
import { refresh } from './refresh';
import { verify } from './verify';

import { User } from '../types/user';
import { Business } from '../types/business';

import { useDatabase } from '../infra/database';

export const GAuth = async (apiKey: string) => {
    const { connect, schemas } = useDatabase();
    await connect();

    const getBusinessByApiKey = async (): Promise<Business> => {
        const business = await schemas.Business.findOne({ apiKey });

        if (!business) throw new Error('Invalid Api Key');

        return {
            uuid: business._id.toString(),
            apiKey: business.apiKey,
            name: business.name,
        }
    };

    const business = await getBusinessByApiKey();

    return {
        authenticate(username: string, password: string) {
            return authenticate(business, username, password);
        },
        refresh(refreshToken: string) {
            return refresh(business, refreshToken);
        },
        register(user: Omit<User, 'uuid'>) {
            return register(business, user);
        },
        verify(token: string) {
            return verify(business, token);
        }
    }

}
