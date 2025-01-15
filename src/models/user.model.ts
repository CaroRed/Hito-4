import bcrypt from "bcryptjs";
import {
    AllowNull,
    Column,
    DataType,
    Default,
    IsEmail,
    IsUUID,
    Model,
    PrimaryKey,
    Table,
    Unique,
} from "sequelize-typescript";
import { IUser } from "../interfaces/user.interface";

@Table({
    tableName: "users",
})
export class User extends Model<IUser> {
    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    uid!: string;

    @AllowNull(false)
    @IsEmail
    @Unique
    @Column(DataType.STRING)
    email!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    password!: string;



}