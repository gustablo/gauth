import { User } from '../types/user';
export declare const GAuth: (apiKey: string) => Promise<{
    authenticate(username: string, password: string): Promise<import("../types/token").Token>;
    refresh(refreshToken: string): Promise<{
        token: string;
    }>;
    register(user: Omit<User, 'uuid'>): Promise<import("../types/user").UserNoPass>;
    verify(token: string): Promise<unknown>;
}>;
