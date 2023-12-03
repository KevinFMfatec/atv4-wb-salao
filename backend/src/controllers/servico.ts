import { servicos } from "models/servico";
import { AppDataSource } from 'database/database'
import { NextFunction, Request, Response } from 'express'
import { IServicos } from 'interface'

const servicosRepository = AppDataSource.getRepository(servicos)

class Servico {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { servico_id, servico_nome, servico_valor }: IServicos = req.body
            await servicosRepository
                .createQueryBuilder()
                .insert()
                .into(servicos)
                .values(req.body)
                .execute()
            res.json(req.body)
        } catch (error) {
            res.json(error)
        }
    }
    async findMany(req: Request, res: Response) {
        try {
            const find = await servicosRepository
                .createQueryBuilder()
                .select(['s'])
                .from(servicos, 's')
                .getMany()
            res.json(find)
        } catch (error) {
            res.json(error)
        }
    }
    async relation(req: Request, res: Response) {
        try {
            const { servicosServicoId } = req.body
            const { id } = req.params
            await AppDataSource
                .createQueryBuilder()
                .insert()
                .into(`servico_cliente`)
                .values({
                    clienteClienteId: id,
                    servicosServicoId: servicosServicoId
                })
                .execute()
            res.json(req.body)
        } catch (error) {
            res.json(error)
        }
    }
    async deleteRelations(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            await AppDataSource
                .createQueryBuilder()
                .delete()
                .from(`servico_cliente`)
                .where("clienteClienteId = :clienteClienteId", {
                    clienteClienteId: id
                })
                .execute()
            next()
        } catch (error) {
            res.json(error)
        }
    }
    async deleteServicoRelacao(req: Request, res:Response,){
        try {
            const { id, servico } = req.params
            await AppDataSource
            .createQueryBuilder()
            .delete()
            .from(`servico_cliente`)
            .where("clienteClienteId = :clienteClienteId", {
                clienteClienteId: id
            })
            .andWhere("servicosServicoId = :servicosServicoId",{
                servicosServicoId: servico
            })
            .execute()
            res.json({message: "oi"})
        } catch (error) {
            res.json(error)
        }
    }
    async findOne (req:Request, res:Response){
        try {
            const {id} = req.params
            const find = await servicosRepository.
            createQueryBuilder().select(['s']).from(servicos,'s')
            .where('s.servico_id = :servico_id',{servico_id:id}).getOne()
            res.json (find)  
        } catch (error) {
            res.json (error)        
        }
    }
    async deletar(req:Request, res:Response) {
        try {
            const {id} = req.params
            await servicosRepository.
            createQueryBuilder().delete().from(servicos).
            where ('servico_id = :servico_id',{servico_id:id}).execute()
        } catch(error){
            res.json (error)
        }
    }

    async editar(req:Request, res:Response){
        try {
            const {id} = req.params
            const body: IServicos = req.body
            await servicosRepository.
            createQueryBuilder().update().set({
                'servico_nome':body.servico_nome,
                'servico_valor':body.servico_valor
            }).where ('servico_id = :servico_id', {servico_id:id}).execute()
        } catch(error){
            res.json (error)
        }
    }
}

export default new Servico