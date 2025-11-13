const errorHandler = (err, req, res, next) => {
    console.error("Erreur serveur:", err);

    const status = err.status || 500;
    const message = status === 500
        ? "Erreur serveur interne"
        : err.message || "Erreur inconnue";

    res.status(status).json({ message });
};

export default errorHandler;