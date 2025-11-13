import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import errorHandler from "./middlewares/Errors.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
    rateLimit({
        windowMs: 60*1000,
        max: 10,
        message: {
            status: 429,
            message: "Trop de requêtes. Réessayez dans une minute."
        },
        standardHeaders: true,
        legacyHeaders: false
    })
);

import userRoutes from "./routes/userRoutes.js";
app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.json({ message: "API OK" }));

app.use(errorHandler);

export default app;
