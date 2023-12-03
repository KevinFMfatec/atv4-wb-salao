import express from 'express'
import Cliente from 'controllers/cliente'
import CPFs from 'controllers/cpf'
import RGs from 'controllers/rg'
import Telefone from 'controllers/telefone'
import Produtos from 'controllers/produtos'
import Servico from 'controllers/servico'

const router = express.Router()

router.post('/criar-cliente', Cliente.create, RGs.create, Telefone.create, CPFs.create,)
router.put('/atualizar-cliente/:id', Cliente.update)
router.get('/achar-cliente/:id', Cliente.findOne)
router.get('/achar-cliente', Cliente.findMany)

router.delete('/deletar-cliente/:id', Telefone.delete, RGs.delete, CPFs.delete, Produtos.deleteRelations, Servico.deleteRelations, Cliente.delete)
router.post('/enviar-rg', RGs.createRG)
router.post('/enviar-telefone', Telefone.createTell)
router.delete('/deletar-rg/:id/:rg', RGs.deleteRG)
router.delete('/deletar-tell/:id/:tell', Telefone.deletarTell)
router.put('/atualizar-cliente-telefone/:cliente_id/:telefone_id', Telefone.update )
router.put('/atualizar-cliente-cpf/:cliente_id/:cpf_id', CPFs.update)
router.put('/atualizar-cliente-rg/:cliente_id/:rg_id', RGs.update)

export default router;