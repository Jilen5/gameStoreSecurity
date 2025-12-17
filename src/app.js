import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import errorHandler from "./middlewares/Errors.js";
import connectMongo from "./config/db.mongo.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";
import helmet from "helmet";

const app = express();
connectMongo();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
const limiter = rateLimit({
    windowMs: 60*1000,
    max: 10,
    message: {
        status: 429,
        message: "Trop de requêtes. Réessayez dans une minute."
    },
    standardHeaders: true,
    legacyHeaders: false
});

if (process.env.NODE_ENV !== "test") {
    app.use(limiter);
}

//Redirection HTTP => HTTPS côté serveur
app.use((req, res, next) => {
  if (!req.secure) {
    return res.redirect("https://" + req.headers.host + req.url);
  }
  next();
});

//Redirection HTTP => HTTPS côté navigateur et empêche toute utilisation de HTTP
app.use(
  helmet.hsts({
    maxAge: 86400,
    includeSubDomains: false,
  })
);

//Empêche les injections XSS
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "defaultSrc": ["'self'"],
        "script-src": ["'self'"],
        "connectSrc": ["'self'"],
        "styleSrc": ["'self'"]
      },
    },
  })
);

import authRoutes from "./routes/authRoutes.js";
app.use("/api/auth", authRoutes);

import userRoutes from "./routes/userRoutes.js";
app.use("/api/users", userRoutes);

import gameRoutes from "./routes/gameRoutes.js";
app.use("/api/games", gameRoutes);

import commentRoutes from "./routes/commentRoutes.js";
app.use("/api/comments", commentRoutes);

import categoryRoutes from "./routes/categoryRoutes.js";
app.use("/api/categories", categoryRoutes);

import profileRoutes from "./routes/profileRoutes.js";
app.use("/api/profiles", profileRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => res.json({ message: "API OK" }));

app.use(errorHandler);

export default app;
