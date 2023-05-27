import { UserNoPass } from './user';

type Token = {
    token: string;
    refreshToken: string;
};

type TokenPayload = UserNoPass;

type RefreshTokenPayload = Pick<TokenPayload, 'uuid'>;

export type {
    Token,
    TokenPayload,
    RefreshTokenPayload,
};
