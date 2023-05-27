import { Business } from '../types/business';
import { User, UserNoPass } from '../types/user';
export declare const register: (business: Business, user: Omit<User, 'uuid'>) => Promise<UserNoPass>;
