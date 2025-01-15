import "dotenv/config";
import app from "./app"
import { sequelize } from "./config/sequelize";

const port = process.env.PORT || 3000;

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        console.log("Database connected");
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.log(error);
    }
})();