import { Business } from '../types/business';
import { Token } from '../types/token';
export declare const authenticate: (business: Business, username: string, password: string) => Promise<Token>;
