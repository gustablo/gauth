import { RefreshTokenPayload, TokenPayload } from '../types/token';
export declare const useJwt: (secret: string) => {
    sign: (payload: TokenPayload | RefreshTokenPayload, expiresIn?: string) => string;
    verify: <T>(token: string) => Promise<T>;
};
