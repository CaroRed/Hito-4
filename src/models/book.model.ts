import {
    AllowNull,
    Column,
    DataType,
    Default,
    Model,
    PrimaryKey,
    Table,
    Unique,
    AutoIncrement
} from "sequelize-typescript";
import { BookAttributes } from "../interfaces/book.interface";

@Table({
    tableName: "books",
})
export class Book extends Model<BookAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING(50))
    isbn!: string;

    @AllowNull(false)
    @Column(DataType.STRING(255))
    name!: string;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    pages!: number;

}
