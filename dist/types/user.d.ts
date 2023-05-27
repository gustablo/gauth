type User = {
    uuid: string;
    refId?: string;
    username: string;
    password: string;
};
type UserNoPass = Omit<User, 'password'>;
export type { User, UserNoPass };
