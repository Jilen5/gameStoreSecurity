import express from "express";

const app = express();

app.use(express.json());

const userRoutes = require("./routes/userRoutes.js");
app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.json({ message: "API OK" }));

export default app;
