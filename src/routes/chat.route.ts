import { Router } from "express";
import { verifyToken } from "../middlewares/jwt.middleware";

const router = Router();

// Ejemplo de endpoint para obtener historial de mensajes (puedes conectarlo a la BD)
router.get("/:room", verifyToken, (req, res) => {
    const { room } = req.params;
    res.json({ message: `Aquí iría el historial del chat de la sala ${room}` });
});

export default router;
