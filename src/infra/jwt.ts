import jwt from 'jsonwebtoken';
import { RefreshTokenPayload, TokenPayload } from '../types/token';

const sign = (secret: string) => (payload: TokenPayload | RefreshTokenPayload, expiresIn = '15m') => jwt.sign(payload, secret, { expiresIn });

const verify = (secret: string) => async <T>(token: string): Promise<T> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) return reject(err);

            return resolve(decoded as T);
        });
    });
}

export const useJwt = (secret: string) => {
    return { sign: sign(secret), verify: verify(secret) };
};
