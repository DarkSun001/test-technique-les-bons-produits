import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB!;

if (!uri || !dbName) {
  throw new Error("Les Variables MONGODB_URI et MONGODB_DB sont Obligatoires.");
}

let client: MongoClient;
let database: Db;

export async function connectDB(): Promise<Db> {
  if (database) {
    return database;
  }

  client = new MongoClient(uri);
  try {
    await client.connect();
    database = client.db(dbName);
    console.log("Connecté à la db.");
    return database;
  } catch (err) {
    console.error("Echec de connexion", err);
    throw err;
  }
}

export async function disconnectDB() {
  if (client) {
    await client.close();
    console.log("La db est close");
  }
}
