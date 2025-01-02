import "dotenv/config";
import { pool } from "./config/database";
import app from "./app"

const port = process.env.PORT || 3000;

(async () => {
    try {
        const { rows } = await pool.query("SELECT NOW()");
        console.log(`DB connecting: ${rows[0].now}`);
        app.listen(port, () => {
            console.log("Servidor andando en el puerto: " + port);
        });
    } catch (error) {
        console.log(error);
    }
})();