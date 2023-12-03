/* eslint-disable react/jsx-pascal-case */
import { useState, useCallback, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import NavBar_ from '../../../component/NavBar';
import IProduto from '../../../interface/produto';
import { service } from '../../../service/serve';
import { PencilSimple, Eraser, Eye } from 'phosphor-react';

function Produtos() {
    const [produto, setProduto] = useState<IProduto[]>([])
    useEffect(() => {
        getProduto()
    })
    async function getProduto() {
        const response = await service.get<IProduto[]>(`/produto/findMany`)
        setProduto(response.data)
    }
    const deletar = useCallback(
        async (prod: number) => {
            await service.delete(`produto/deletar/${prod}`)
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
                <NavBar_ />
            </header>
            <main>
                <h1>Produtos</h1>
                <div className="tables">
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Produto</th>
                                <th>Preço</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        {produto.map(p => {
                            return (
                                <tbody>
                                    <tr>
                                        <td>{p.produto_id}</td>
                                        <td>{p.produto_nome}</td>
                                        <td>{p.produto_valor}</td>      
                                        <td>
                                            <div className="icons">
                                                <a href={`editar_produto/${p.produto_id}`}><PencilSimple size={35} color="#198754"/></a>
                                                <a href={`produtos/${p.produto_id}`}><Eye size={35} color="#0DCAF0"/></a>
                                                <a href="##" onClick={() => deletar(p.produto_id)}><Eraser size={35} color="#DC3545"/></a>           
                                            </div> 
                                            <div className="Button">
                                                <Button variant="outline-success" href={`editar_produto/${p.produto_id}`} >Editar</Button>{' '}
                                                <Button variant="outline-info" href={`produtos/${p.produto_id}`}>Visualizar</Button>{' '}
                                                <Button variant="outline-danger" onClick={() => deletar(p.produto_id)}>Remover</Button>{' '}
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

export default Produtos;