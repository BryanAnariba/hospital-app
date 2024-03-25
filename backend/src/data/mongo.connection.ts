import mongoose from "mongoose";

interface MongoConnectionOptions {
  dbName: string;
  connectionUrl: string;
}

export class MongoConnection {

  public static async connectToDB({dbName, connectionUrl}: MongoConnectionOptions) {
    try {
      const conn = await mongoose.connect(connectionUrl, {dbName: dbName});
      console.log(`MongoDB is connected on host: ` + conn.connection.host);
      return true;
    } catch (error) {
      console.log('MongoDB Conenction error!');
      throw error;
    }
  }
}
