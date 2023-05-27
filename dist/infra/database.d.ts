import mongoose from 'mongoose';
export declare const useDatabase: () => {
    connect: () => Promise<mongoose.Connection>;
    schemas: {
        Business: mongoose.Model<{
            name: string;
            apiKey: string;
        }, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
            name: string;
            apiKey: string;
        }>>;
        User: mongoose.Model<{
            username: string;
            password: string;
            refId?: string | undefined;
            business?: mongoose.Types.ObjectId | undefined;
        }, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
            username: string;
            password: string;
            refId?: string | undefined;
            business?: mongoose.Types.ObjectId | undefined;
        }>>;
    };
};
