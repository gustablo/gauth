import mongoose, { Schema } from 'mongoose';

const connect = async () => {
    mongoose.set('strictQuery', true);

    return mongoose.connect('mongodb://mongodb:27018')
        .then(result => {
            const db = result.connection;
            db.set('debug', false);
            return db;
        });
}

const Business = mongoose.model('Business', new Schema({
    name: {
        type: String,
        required: true,
    },
    apiKey: {
        type: String,
        required: true,
    },
}));

const User = mongoose.model('User', new Schema({
    refId: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    business: { type: Schema.Types.ObjectId, ref: 'Business' },
}));

export const useDatabase = () => {
    return { connect, schemas: { Business, User } };
};
