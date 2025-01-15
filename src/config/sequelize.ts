import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user.model";
import { Book } from "../models/book.model";
import "dotenv/config";

const DATABASE_URL = process.env.CONNECT_DB;

if (!DATABASE_URL) {
    throw new Error("Not url database found!")
}

export const sequelize = new Sequelize(DATABASE_URL, {
    dialect: "postgres",
    models: [User, Book],
    logging: false, // disable logging
});