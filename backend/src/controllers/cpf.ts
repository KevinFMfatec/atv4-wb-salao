import { CPF } from 'models/cpf'
import { AppDataSource } from 'database/database'
import { NextFunction, Request, Response } from 'express'
import { ICpf } from 'interface'

const cpfRepository = AppDataSource.getRepository(CPF)

class CPFs {
    async create(req: Request, res: Response,) {
        try {
            const { cpf_valor, cpf_dataEmissao }: ICpf = req.body
            await cpfRepository
                .createQueryBuilder()
                .insert()
                .into(CPF)
                .values({
                    cpf_valor: cpf_valor,
                    cpf_dataEmissao: cpf_dataEmissao,
                    cliente: req.body.cliente_id
                })
                .execute()
            res.json(req.body)
        } catch (error) {
            res.json(error)
        }
    }
    async update(req: Request, res: Response) {
        try {
            const { cliente_id, cpf_id } = req.params
            const body: ICpf = req.body
            await cpfRepository
                .createQueryBuilder()
                .update()
                .set({
                    "cpf_dataEmissao": body.cpf_dataEmissao,
                    "cpf_valor": body.cpf_valor
                })
                .where('cpf_id = :cpf_id', {
                    cpf_id: cpf_id
                })
                .andWhere('cliente = :cliente_id', {
                    cliente_id: cliente_id
                })
                .execute()
            res.json(req.body)
        } catch (error) {
            res.json(error)
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            await cpfRepository
                .createQueryBuilder()
                .delete()
                .where("cliente = :cliente_id", {
                    cliente_id: id
                })
                .execute()
            next()
        } catch (error) {
            res.json(error)
        }
    }
}

export default new CPFs