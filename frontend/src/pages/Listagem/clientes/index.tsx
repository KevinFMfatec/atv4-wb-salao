/* eslint-disable react/jsx-pascal-case */
import { useState, useCallback, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import NavBar_ from '../../../component/NavBar';
import './styles.css';
import { service } from '../../../service/serve';
import ICliente from '../../../interface/';
import { Eye, PencilSimple, Eraser, ListPlus } from 'phosphor-react';

function Clientes() {
    const [clientes, setCliente] = useState<ICliente[]>([])
    useEffect(() => {
        getMany()
    })
    async function getMany() {
        const response = await service.get<ICliente[]>(`cliente/achar-cliente`)
        setCliente(response.data)
    }
    const deleteUser = useCallback(
        async (id: number) => {
            await service.delete(`cliente/deletar-cliente/${id}`)
                .then(({ data }) => {
                    console.log(data);
                })
                .catch(error => {
                    console.log(error);
                });
        }, []
    )
    return (
        <section>
            <header>
                <NavBar_ />
            </header>
            <main>
                <h1>Clientes</h1>
                <div className="tables">
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>Nome Social</th>
                                <th>Genero</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes && clientes.map(cliente => {
                                return (
                                    <tr>
                                        <td>
                                            {cliente.cliente_id}
                                        </td>
                                        <td>
                                            {cliente.cliente_nome}
                                        </td>
                                        <td>
                                            {cliente.cliente_nomeSocial}
                                        </td>
                                        <td>
                                            {cliente.cliente_genero}
                                        </td>                 
                                        <td>
                                            <div className='icons'>
                                                <a href={`/editar_cliente/${cliente.cliente_id}`}><PencilSimple size={35} color="#198754" alt='Editar Cliente'/></a>                                          
                                                <a href={`clientes/${cliente.cliente_id}`}><Eye size={35} color="#0DCAF0" alt='Visualizar Cliente'/></a>
                                                <a href={`cadastrar_produto/${cliente.cliente_id}`}><ListPlus size={35} color="#0DCAF0" alt='Adicionar Produtos'/></a>
                                                <a href={`cadastrar_produto_servico/${cliente.cliente_id}`}><ListPlus size={35} color="#0DCAF0" alt='Adicionar Serviços'/></a>
                                                <a href="##" onClick={() => deleteUser(cliente.cliente_id)}><Eraser size={35} color="#DC3545" alt='Remover Cliente'/></a>
                                            </div>

                                            <div className='Button'>
                                                <Button variant="outline-success" href={`/editar_cliente/${cliente.cliente_id}`}>Editar</Button>{' '}
                                                <Button variant="outline-info"  href={`clientes/${cliente.cliente_id}`}>Visualizar</Button>{' '}
                                                <Button variant="outline-info" href={`cadastrar_produto/${cliente.cliente_id}`}>Adicionar Produtos</Button>{' '}
                                                <Button variant="outline-info" href={`cadastrar_produto_servico/${cliente.cliente_id}`}>Adicionar Serviços</Button>{' '}
                                                <Button variant="outline-danger" onClick={() => deleteUser(cliente.cliente_id)} >Remover</Button>{' '}
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                            )}
                        </tbody>
                    </Table>
                </div>
            </main>
        </section>
    );
}

export default Clientes;