import { useJwt } from '../infra/jwt';
import { Business } from '../types/business';

export const verify = async (business: Business, token: string) => {
    const { verify: verifyJwt } = useJwt(business.apiKey);

    return verifyJwt(token);
};
