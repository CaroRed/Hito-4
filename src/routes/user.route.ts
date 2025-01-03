import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/jwt.middleware";

const router = Router();

// path: http:localhost:3000/api/v1/users

// router.use(verifyToken)

// leer los usuarios
router.get("/", verifyToken, userController.getUsers);

// leer un único usuario por id
router.get("/:id", verifyToken, userController.getUser);

// crear un usuario
router.post("/", userController.createUser);

// actualizar un usuario por id
router.put("/:id", verifyToken, userController.updateUser);

// eliminar un usuario por id
router.delete("/:id", verifyToken, userController.deleteUser);

export default router;