import { Router } from 'express';
import { getItems, getItemById, createItem, updateItem, deleteItem } from '../controllers/itemController';

const router = Router();

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Lista todos os itens
 *     responses:
 *       200:
 *         description: Sucesso
 */
router.get('/', getItems);

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Obter item por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do item
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucesso
 *       404:
 *         description: Item não encontrado
 */
router.get('/:id', getItemById);

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Criar um novo item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *     responses:
 *       201:
 *         description: Item criado com sucesso
 */
router.post('/', createItem);

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Atualizar um item existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do item
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso
 *       404:
 *         description: Item não encontrado
 */
router.put('/:id', updateItem);

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Deletar um item existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do item
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item deletado com sucesso
 *       404:
 *         description: Item não encontrado
 */
router.delete('/:id', deleteItem);

export default router;
