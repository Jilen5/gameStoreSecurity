import express from "express";
import CategoryController from "../controllers/categoryController.js";
import { authenticateToken } from "../middlewares/Auth.js";
import { authorizeRoles } from "../middlewares/Roles.js";

const router = express.Router();

/**
 * @openapi 
 * /api/categories/:
 * GET: 
 *      summary: Récupére tout les categories
 *      parameters:
 *        - in: path
 *         name: id
 *        required: true
 *        schema:
 *         type: integer
 *        description: l'id de la category
 *     responses:
 *       200:
 *        description: La liste des categories
 *      404:
 *       description: Categorie non trouvé
 * 
 */
router.get("/", authenticateToken, CategoryController.listCategories);
/**
 * @openapi
 * /api/categories/{id}:
 * GET:
 *     summary: Récupére une categorie par son id
 *    parameters:
 *      - in: path
 *       name: id
 *     required: true
 *    schema:
 *     type: integer
 *    description: l'id de la category
 *  responses:
 *     200:
 *      description: Une categorie
 *    404:
 *     description: Categorie non trouvé
 */
router.get("/:id", authenticateToken, CategoryController.getCategory);
/**
 * @openapi
 * /api/categories/:
 * POST:
 *    summary: Crée une nouvelle categorie
 *   requestBody:
 *    required: true
 *   content:
 *    application/json:
 *     schema:
 *      type: object
 *     properties:
 *      name:
 *       type: string
 *      description: Le nom de la categorie
 *    responses:
 *     201:
 *     description: Categorie crée
 *    500:
 *     description: Erreur serveur interne
 */
router.post("/", authenticateToken, authorizeRoles("admin"), CategoryController.createCategory);
/**
 * @openapi
 * /api/categories/{id}:
 * PUT:
 *   summary: Met à jour une categorie par son id
 *   parameters:
 *    - in: path
 *     name: id
 *   required: true
 *   schema:
 *    type: integer
 *   description: l'id de la category
 *   requestBody:
 *    required: true
 *   content:
 *   application/json:
 *   schema:
 *    type: object
 *   properties:
 *    name:
 *     type: string
 *    description: Le nom de la categorie
 *   responses:
 *   200:
 *    description: Categorie mise à jour
 *   404:
 *    description: Categorie non trouvé
 */

router.put("/:id", authenticateToken, authorizeRoles("admin"), CategoryController.updateCategory);
/**
 * @openapi
 * /api/categories/{id}:
 * DELETE:
 *      summary: Supprime une categorie par son id 
 *      parameters:
 *       - in: path
 *        name: id
 *     required: true
 *    schema:
 *     type: integer
 *   description: l'id de la category
 *  responses:
 *    204:
 *     description: Categorie supprimée
 *    500:
 *     description: Erreur serveur interne
 */
router.delete("/:id", authenticateToken, authorizeRoles("admin"), CategoryController.deleteCategory);
export default router;
