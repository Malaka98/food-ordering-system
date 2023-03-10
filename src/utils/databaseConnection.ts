import mongoose from "mongoose";

require("dotenv").config();

class Database {
  private static instance: Database;

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  public connect(): void {
    mongoose.set("strictQuery", false);
    const {
      MONGO_USER,
      MONGO_PASSWORD,
      MONGO_PATH,
    } = process.env;

    const mongoUrl = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_PATH}`;

    mongoose
      .connect(mongoUrl)
      .then(() => {console.log("MongoDB connected");})
      .catch((err) => console.log(err));
  }
}

export default Database.getInstance();
