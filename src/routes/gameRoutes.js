import express from "express";
import GameController from "../controllers/gameController.js";
import { authenticateToken } from "../middlewares/Auth.js";
import { authorizeRoles } from "../middlewares/Roles.js";

const router = express.Router();

/**
 * @openapi
 * /api/games/:
 * GET:
 *      summary: Récupére tout les jeux
 *      parameters:
 *      - in: path
 *       name: id
 *     required: true
 *    schema:
 *    type: integer
 *   description: l'id du jeu
 *  responses:
 *   200:
 *      description: La liste des jeux
 *   404:
 *      description: Jeu non trouvé
 */
router.get("/", authenticateToken, GameController.listGames);
/**
 * @openapi
 * /api/games/{id}:
 * GET:
 *    summary: Récupére un jeu par son id
 *    parameters:
 *     - in: path
 *      name: id
 *      required: true
 *    schema:
 *    type: integer
 *      description: l'id du jeu
 *    responses:
 *    200:
 *     description: Un jeu
 *    404:
 *     description: Jeu non trouvé
 */
router.get("/:id", authenticateToken, GameController.getGame);
/**
 * @openapi
 * /api/games/:
 * POST:
 *      summary: Crée un nouveau jeu
 *      requestBody:
 *       required: true
 *      content:
 *      application/json:
 *      schema:
 *       type: object
 *      properties:
 *      name:
 *      type: string
 *      price:
 *         type: number
 *     description: Le nom et le prix du jeu
 *      responses:
 *      201:
 *          description: Jeu crée
 *      400:
 *        description: Requête invalide
 */
router.post("/", authenticateToken, authorizeRoles("admin"), GameController.createGame);
/**
 * @openapi
 * /api/games/{id}:
 * PUT:
 *    summary: Met à jour un jeu par son id 
 *    parameters:
 *    - in: path
 *    name: id
 *      required: true
 *    schema:
 *    type: integer
 *    description: l'id du jeu
 *    requestBody:
 *     required: true
 *    content:
 *    application/json:
 *    schema:
 *    type: object
 *    properties:
 *    name:
 *      type: string
 *      price:
 *       type: number
 *    description: Le nom et le prix du jeu
 *     responses:
 *    200:
 *     description: Jeu mis à jour
 *    404:
 *     description: Jeu non trouvé
 */
router.put("/:id", authenticateToken, authorizeRoles("admin"), GameController.updateGame);
/**
 * @openapi
 * /api/games/{id}:
 * DELETE:
 *     summary: Supprime un jeu par son id
 *     parameters:
 *      - in: path
 *       name: id
 *    required: true
 *    schema:
 *    type: integer
 *      description: l'id du jeu
 *   responses:
 *   204:
 *    description: Jeu supprimé
 *   404:
 *    description: Jeu non trouvé 
 */
router.delete("/:id", authenticateToken, authorizeRoles("admin"), GameController.deleteGame);

export default router;
