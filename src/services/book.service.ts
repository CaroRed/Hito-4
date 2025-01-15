import { Book } from "../models/book.model";

const getAll = async () => {
    const books = await Book.findAll();
    return books;
};

const getBookById = async (id: number) => {
    const book = await Book.findByPk(id);

    if (!book) {
        throw new Error("Book not found");
    }

    return book.toJSON();
};

const createBook = async (isbn: string, name: string, pages: number) => {
    const book = await Book.findOne({ where: { isbn } });

    if (book) {
        throw new Error("book ISBN already exists");
    }

    const newBook = await Book.create({ isbn, name, pages });

    return newBook.toJSON();
}

const updateBook = async (id: number, name: string, pages: number) => {

    const book = await Book.findByPk(id);

    if (!book) {
        throw new Error("Book not found");
    }

    const result = await Book.update({ id, name, pages }, { where: { id: id } });

    return result;
}

const deleteBook = async (id: number) => {
    const book = await Book.findByPk(id);
    if (!book) throw new Error("book not found");

    const deleteBook = await Book.destroy({
        where: {
            id: id,
        },
    });
    return deleteBook;
}

export const bookService = {
    getAll,
    getBookById,
    createBook,
    updateBook,
    deleteBook
}