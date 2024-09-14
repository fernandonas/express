import { Router } from 'express';
import { getAll, getById, Add, update, remove } from '../controllers/itemController';

const router = Router();

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Listar todos os itens
 *     responses:
 *       200:
 *         description: Sucesso
 */
router.get('/', getAll);

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
router.get('/:id', getById);

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
 *               - uuid
 *               - limitYellow
 *               - limitGreen
 *               - objective
 *               - toggle
 *               - indicator
 *               - unit
 *               - yAxisValues
 *               - xAxisValues
 *             properties:
 *               uuid:
 *                 type: string
 *                 description: Identificador único da configuração
 *               limitYellow:
 *                 type: string
 *                 description: Limite amarelo
 *               limitRed:
 *                 type: string
 *                 description: Limite vermelho (opcional)
 *               limitGreen:
 *                 type: string
 *                 description: Limite verde
 *               objective:
 *                 type: string
 *                 description: Objetivo da configuração
 *               toggle:
 *                 type: boolean
 *                 description: Estado do toggle
 *               indicator:
 *                 type: string
 *                 description: Indicador associado
 *               unit:
 *                 type: string
 *                 description: Unidade de medida
 *               yAxisValues:
 *                 type: array
 *                 description: Valores do eixo Y
 *                 items:
 *                   type: number
 *               xAxisValues:
 *                 type: array
 *                 description: Valores do eixo X
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Item criado com sucesso
 */

router.post('/', Add);

/**
 * @swagger
 * /items/{uuid}:
 *   put:
 *     summary: Atualizar um item existente
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: UUID da configuração
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - uuid
 *               - limitYellow
 *               - limitGreen
 *               - objective
 *               - toggle
 *               - indicator
 *               - unit
 *               - yAxisValues
 *               - xAxisValues
 *             properties:
 *               uuid:
 *                 type: string
 *                 description: Identificador único da configuração
 *               limitYellow:
 *                 type: string
 *                 description: Limite amarelo
 *               limitRed:
 *                 type: string
 *                 description: Limite vermelho (opcional)
 *               limitGreen:
 *                 type: string
 *                 description: Limite verde
 *               objective:
 *                 type: string
 *                 description: Objetivo da configuração
 *               toggle:
 *                 type: boolean
 *                 description: Estado do toggle
 *               indicator:
 *                 type: string
 *                 description: Indicador associado
 *               unit:
 *                 type: string
 *                 description: Unidade de medida
 *               yAxisValues:
 *                 type: array
 *                 description: Valores do eixo Y
 *                 items:
 *                   type: number
 *               xAxisValues:
 *                 type: array
 *                 description: Valores do eixo X
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso
 *       404:
 *         description: Item não encontrado
 */

router.put('/:id', update);

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
router.delete('/:id', remove);

export default router;
