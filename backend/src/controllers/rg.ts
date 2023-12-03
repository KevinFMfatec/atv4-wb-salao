import { RG } from 'models/rg'
import { AppDataSource } from 'database/database'
import { NextFunction, Request, Response } from 'express'
import { IRg } from 'interface'

const rgRepository = AppDataSource.getRepository(RG)

class RGs {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { rg_valor, rg_dataEmissao }: IRg = req.body
            await rgRepository
                .createQueryBuilder()
                .insert()
                .into(RG)
                .values({
                    rg_valor: rg_valor,
                    rg_dataEmissao: rg_dataEmissao,
                    cliente: req.body.cliente_id
                })
                .execute()
            next()
        } catch (error) {
            res.json(error)
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            await rgRepository
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
    async update(req: Request, res: Response) {
        try {
            const { cliente_id, rg_id } = req.params
            const body: IRg = req.body
            await rgRepository
                .createQueryBuilder()
                .update()
                .set({
                    "rg_dataEmissao": body.rg_dataEmissao,
                    "rg_valor": body.rg_valor
                })
                .where('rg_id = :rg_id', {
                    rg_id: rg_id
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
    async createRG(req: Request, res: Response, next: NextFunction) {
        try {
            const { rg_valor, rg_dataEmissao }: IRg = req.body
            await rgRepository
                .createQueryBuilder()
                .insert()
                .into(RG)
                .values({
                    rg_valor: rg_valor,
                    rg_dataEmissao: rg_dataEmissao,
                    cliente: req.body.cliente
                })
                .execute()
            res.json(req.body)
        } catch (error) {
            res.json(error)
        }
    }
    async deleteRG(req: Request, res: Response) {
        try {
            const { id, rg } = req.params
            await rgRepository
            .createQueryBuilder()
            .delete()
            .from(RG)
            .where("rg_id = :rg_id",{
                rg_id: rg
            })
            .andWhere("cliente = :cliente_id", {
                cliente_id: id
            })
            .execute()
        } catch (error) {
            res.json(error)
        }
    }
}

export default new RGs