import express from "express";
import CommentController from "../controllers/commentController.js";

const router = express.Router();

/**
 * @openapi
 * /api/comments/:
 * GET:
 *      summary: Récupére tout les commentaires 
 *      parameters:
 *       - in: path
 *        name: id
 *       required: true
 *      schema:
 *    type: integer
 *     description: l'id du commentaire
 *   responses:
 *    200:
 *     description: La liste des commentaires
 *    404:
 *     description: Commentaire non trouvé
 */
router.get("/", CommentController.listComments);
/**
 * @openapi
 * /api/comments/{id}:
 * GET:
 *    summary: Récupére un commentaire par son id
 *   parameters:
 *    - in: path
 *    name: id
 *  required: true
 *   schema:
 *   type: integer
 *  description: l'id du commentaire
 *  responses:
 *   200:
 *    description: Un commentaire
 *   404:
 *    description: Commentaire non trouvé
 */
router.get("/:id", CommentController.getComment);
/**
 * @openapi
 * /api/comments/:
 * POST:
 *   summary: Crée un nouveau commentaire
 *  requestBody:
 *   required: true
 *  content:
 *   application/json:
 *   schema:
 *   type: object
 *  properties:
 *   content:
 *    type: string
 *    note:
 *      type: integer
 *      type:
 *      type: string
 *   description: Le contenu, la note et le type du commentaire
 *   responses:
 *    201:
 *      description: Commentaire crée
 *    400:
 *     description: Requête invalide
 */
router.post("/", CommentController.createComment);
/**
 * @openapi
 * /api/comments/{id}:
 * PUT:
 *      summary: Met à jour un commentaire par son id
 *      parameters:
 *          - in: path
 *          name: id
 *        required: true
 *       schema:
 *          type: integer
 *          description: l'id du commentaire
 *      requestBody:
 *          required: true
 *      content:
 *        application/json:
 *         schema:
 *          type: object
 *         properties:
 *          content:
 *          type: string
 *         note:
 *          type: integer
 *        type:
 *        type: string
 *     description: Le contenu, la note et le type du commentaire
 *    responses:
 *    200:
 *     description: Commentaire mis à jour
 *    404:
 *     description: Commentaire non trouvé
 */
router.put("/:id", CommentController.updateComment);
/**
 * @openapi
 * /api/comments/{id}:
 * DELETE:
 *     summary: Supprime un commentaire par son id
 *     parameters:
 *      - in: path
 *       name: id
 *      required: true
 *    schema:
 *    type: integer
 *      description: l'id du commentaire
 *   responses:
 *   204:
 *    description: Commentaire supprimé
 *   404:
 *     description: Commentaire non trouvé
 */
router.delete("/:id", CommentController.deleteComment);

export default router;
