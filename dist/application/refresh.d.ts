import { Business } from '../types/business';
export declare const refresh: (business: Business, refreshToken: string) => Promise<{
    token: string;
}>;
