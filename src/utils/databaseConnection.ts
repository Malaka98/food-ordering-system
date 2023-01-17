import mongoose from 'mongoose';

require('dotenv').config();

class Database {
    private static instance: Database;

    private constructor() {
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }

    public connect(): void {
        const {
            MONGO_USER,
            MONGO_PASSWORD,
            MONGO_PATH,
        } = process.env;
        console.log(MONGO_USER)
        const mongoUrl = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_PATH}`;

        mongoose
            .connect(mongoUrl, {
                // useNewUrlParser: true,
                // useUnifiedTopology: true,
                // useCreateIndex: true,
            })
            .then(() => console.log('MongoDB connected'))
            .catch((err) => console.log(err));
    }
}

export default Database.getInstance();
