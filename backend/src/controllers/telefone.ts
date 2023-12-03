import { telefone } from 'models/telefone'
import { AppDataSource } from 'database/database'
import { NextFunction, Request, Response } from 'express'
import { ITelefone } from 'interface'

const telefoneRepository = AppDataSource.getRepository(telefone)

class Telefone {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { telefones } = req.body
            const cliente = req.body.cliente_id
            const adicionarTelefone = telefones.map((t: any) => {
                return {
                    ...t,
                    cliente
                }
            })
            await telefoneRepository
                .createQueryBuilder()
                .insert()
                .into(telefone)
                .values(adicionarTelefone)
                .execute()
            next()
        } catch (error) {
            res.json(error)
        }
    }
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { telefone_id, cliente_id } = req.params
            const body: ITelefone = req.body
            await telefoneRepository
                .createQueryBuilder()
                .update()
                .set({
                    "telefone_ddd": body.telefone_ddd,
                    "telefone_numero": body.telefone_numero
                })
                .where('telefone_id = :telefone_id', {
                    telefone_id: telefone_id
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
            await telefoneRepository
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
    async createTell(req: Request, res: Response) {
        try {
            const body: ITelefone = req.body
            await telefoneRepository
                .createQueryBuilder()
                .insert()
                .into(telefone)
                .values({
                    telefone_ddd: body.telefone_ddd,
                    telefone_numero: body.telefone_numero,
                    cliente: req.body.cliente
                })
                .execute()
        } catch (error) {
            res.json(error)
        }
    }
    async deletarTell(req: Request, res: Response) {
        try {
            const { id, tell} = req.params
            await telefoneRepository
            .createQueryBuilder()
            .delete()
            .from(telefone)
            .where("telefone_id = :telefone_id", {
                telefone_id: tell
            })
            .andWhere("cliente = :cliente_id",{
                cliente_id: id
            })
            .execute()
        } catch (error) {
            res.json(error)
        }
    }
}

export default new Telefone