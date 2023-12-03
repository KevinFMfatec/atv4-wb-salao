import Produtos from 'controllers/produtos';
import express from 'express';

const router = express.Router()

router.post('/add-produto', Produtos.create)
router.post('/add-produto-cliente/:id', Produtos.relation)
router.get('/findMany', Produtos.findMany)
router.get('/findOne/:id', Produtos.findOne)
router.delete('/deleteRelation/:id/:produto', Produtos.deleteProdutoRelacao)
router.delete('/deletar/:id', Produtos.deletarProd)
router.put('/editProduto/:id', Produtos.editProduto)

export default router;