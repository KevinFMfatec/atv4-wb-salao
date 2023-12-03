/* eslint-disable react/jsx-pascal-case */
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import NavBar_ from '../../../component/NavBar';
import IServico from '../../../interface/servico';
import { service } from '../../../service/serve';
import { PencilSimple, Eraser, Eye } from 'phosphor-react';

function Servicos() {

    const [servico, setServico] = useState<IServico[]>([])
    useEffect(() => {
        getServicos()
    })

    async function getServicos() {
        const response = await service.get<IServico[]>(`/servico/achar-servico`)
        setServico(response.data)
    }

    const deletar = useCallback(
        async (serv: number) => {
            await service.delete(`servico/deletar/${serv}`)
                .then(({ data }) => {
                    console.log(data)
                })
                .catch(error => {
                    console.log(error);
                })
        }, []
    )

    return (
        <section>
            <header>
                <NavBar_/>
            </header>
            <main>
                <h1>Serviços</h1>
                <div className="tables">
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Serviço</th>
                                <th>Preço</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        {servico.map(s => {
                            return (
                                <tbody>
                                    <tr>
                                        <td className='Center'>{s.servico_id}</td>
                                        <td>{s.servico_nome}</td>
                                        <td>{s.servico_valor}</td>
                                        <td>
                                            <div className="icons">
                                                <a href={`editar_servico/${s.servico_id}`}><PencilSimple size={35} color="#198754"/></a>
                                                <a href={`servicos/${s.servico_id}`}><Eye size={35} color="#0DCAF0"/></a>
                                                <a href="##" onClick={() => deletar(s.servico_id)}><Eraser size={35} color="#DC3545"/></a>           
                                            </div> 
                                            <div className="Button">
                                                <Button variant="outline-success" href={`editar_servico/${s.servico_id}`}>Editar</Button>{' '}
                                                <Button variant="outline-info" href={`servicos/${s.servico_id}`}>Visualizar</Button>{' '}
                                                <Button variant="outline-danger" onClick={() => deletar(s.servico_id)}>Remover</Button>{' '}
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        })}   
                    </Table>
                </div>
            </main>
        </section>
    );
}

export default Servicos;