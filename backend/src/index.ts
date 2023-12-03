import { AppDataSource } from "database/database";
import express from "express";
import cors from 'cors'
import clienteRoute from 'routes/cliente'
import produtoRoute from 'routes/produto'
import ServicoRoute from 'routes/servico'
import { produtos } from "models/produto";
import { servicos } from "models/servico";

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccesStatus: 200
};

const app = express();
try {
    AppDataSource.initialize().then(async () => {
        console.log('Banco conectado com sucesso');
         await AppDataSource.createQueryBuilder()
            .insert()
            .into(produtos)
            .values([
                { produto_nome: "Sabonete", produto_valor: 10.00 },
                { produto_nome: "Creme de Cabelo", produto_valor: 20.00 },
                { produto_nome: "Cortador de unhas", produto_valor: 5.00 },
                { produto_nome: "Creme Dental", produto_valor: 7.50 },
            ])
            .execute()
        await AppDataSource.createQueryBuilder()
        .insert()
        .into(servicos)
        .values([
            {servico_nome: "Cortar Cabelo", servico_valor: 50.75},
            {servico_nome: "Manicure", servico_valor: 50.75},
            {servico_nome: "Pedicure", servico_valor: 50.75},
            {servico_nome: "Cabelo na régua", servico_valor: 50.75}
        ])
        .execute() 
    })
} catch (error) {
    console.log(`Connection error ${error}`);
}

app.use(cors());
app.use(express.json());
app.use('/cliente', clienteRoute)
app.use('/produto', produtoRoute)
app.use('/servico', ServicoRoute)
app.listen(5000, () => console.log('Serve conectado'))