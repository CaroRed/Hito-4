import { Router } from "express";
import { bookController } from "../controllers/book.controller";
import { verifyToken } from "../middlewares/jwt.middleware";

const router = Router();

router.use(verifyToken);

//obtener todos los libros
router.get("/", bookController.getBooks);

//obtener un libro por id
router.get("/:id", bookController.getBookById);

//crear un libro
router.post("/", bookController.createBook);

//modificar un libro
router.put("/:id", bookController.updateBook);

//borrar un libro
router.delete("/:id", bookController.deleteBook);

export default router;