import Servico from 'controllers/servico';
import express from 'express';

const router = express.Router()

router.post('/add-servico', Servico.create)
router.get('/achar-servico', Servico.findMany)
router.get('/findOne/:id', Servico.findOne)
router.post('/add-servico-cliente/:id', Servico.relation)
router.delete('/deletar-servico-cliente/:id/:servico', Servico.deleteServicoRelacao)
router.delete('/deletar/:id', Servico.deletar)
router.put('/editServico/:id', Servico.editar)
export default router;