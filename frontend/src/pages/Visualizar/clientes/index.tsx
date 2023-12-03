import { useState, useEffect, useCallback } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import NavBar_ from '../../../component/NavBar';
import ICliente from '../../../interface/';
import { service } from '../../../service/serve';
import './styles.css'

function VisualizarCliente() {
    const [cliente, setCliente] = useState<ICliente>()
    const { id } = useParams()
    useEffect(() => {
        getOne()
    })
    async function getOne() {
        const response = await service.get<ICliente>(`/cliente/achar-cliente/${id}`)
        setCliente(response.data)
    }
    const deletar = useCallback(
        async (rg: number) => {
            await service.delete(`/cliente/deletar-rg/${id}/${rg}`)
                .then(({ data }) => {
                    console.log(data);
                })
                .catch(error => {
                    console.log(error);
                });
        }, []
    )
    const deletarTell = useCallback(
        async (tell: number) => {
            await service.delete(`/cliente/deletar-tell/${id}/${tell}`)
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
                <h1>Visualizar cliente: "{cliente && cliente?.cliente_nome}"</h1>
                <Button variant="outline-dark" href='/clientes'>Voltar</Button>
                <Card
                    bg="white"
                    text="dark"
                    style={{ width: '18rem' }}
                    className="mb-2"
                >
                    <Card.Header>ID: {cliente && cliente?.cliente_id}</Card.Header>
                    <Card.Body>
                        <Card.Title>{cliente && cliente?.cliente_nome}</Card.Title>
                        <Card.Text>
                            Nome Social: {cliente && cliente?.cliente_nomeSocial}
                        </Card.Text>
                        <Card.Text>
                            Gênero: {cliente && cliente?.cliente_genero}
                        </Card.Text>
                        <Card.Text>
                            CPF: {cliente && cliente?.cpf.cpf_valor} / {cliente && cliente?.cpf.cpf_dataEmissao}
                            <Button variant="outline-info" href={`/editar_cpf/${cliente?.cliente_id}/${cliente?.cpf.cpf_id}`}>Editar CPF</Button>{' '}
                        </Card.Text>
                        <Card.Text>
                            {cliente && cliente?.rg.map((rg, index) => {
                                return (
                                    <>
                                        <p>
                                            RG {index + 1}: - {rg.rg_valor} / {(rg.rg_dataEmissao)}
                                            <Button variant="outline-info" href={`/editar_rg/${cliente.cliente_id}/${rg.rg_id}`}>Editar RG</Button>{' '}
                                            <Button variant="outline-info" onClick={() => deletar(rg.rg_id)}>Deletar RG</Button>{' '}
                                        </p>
                                    </>
                                )
                            })}
                            <Button variant="outline-info" href={`/cadastrar_rg/${cliente?.cliente_id}`}>Adicionar RG</Button>{' '}

                        </Card.Text>
                        <Card.Text>
                            {cliente && cliente?.telefones.map(tell => {
                                return (
                                    <>
                                        Telefone: {tell.telefone_ddd}{' '}{tell.telefone_numero}
                                        <Button variant="outline-info" href={`/editar_tell/${cliente.cliente_id}/${tell.telefone_id}`}>Editar Telefone</Button>{' '}
                                        <Button variant="outline-info" onClick={() => deletarTell(tell.telefone_id)}>Deletar Telefone</Button>{' '}
                                        <br></br>
                                    </>)
                            })}
                            <Button variant="outline-info" href={`/cadastrar_telefone/${cliente?.cliente_id}`}>Adicionar Telefone</Button>{' '}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </main>
        </section>
    )
};

export default VisualizarCliente;