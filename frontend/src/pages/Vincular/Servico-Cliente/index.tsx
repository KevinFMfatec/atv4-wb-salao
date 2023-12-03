/* eslint-disable react/jsx-pascal-case */
import ICliente from '../../../interface/';
import IServico from '../../../interface/servico';
import { useParams } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import NavBar_ from '../../../component/NavBar'
import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { service } from '../../../service/serve';
import './styles.css'

interface IForm {
    servicoid: number;
}

function ClienteServico() {
    const [cliente, setCliente] = useState<ICliente>()
    const [servico, setServicco] = useState<IServico[]>([])
    const { id } = useParams()
    useEffect(() => {
        getOne();
        getServico()
    })
    async function getOne() {
        const response = await service.get<ICliente>(`cliente/achar-cliente/${id}`)
        setCliente(response.data)
    }
    async function getServico() {
        const response = await service.get<IServico[]>(`/servico/achar-servico`)
        setServicco(response.data)
    }
    const deletar = useCallback(
        async (idServico: number) => {
            await service.delete(`/servico/deletar-servico-cliente/${id}/${idServico}`)
                .then(({ data }) => {
                    console.log(data);
                })
                .catch(error => {
                    console.log(error);
                });
        }, []
    )
    const adicionarServico = useCallback(async (data: IForm) => {
        await service.post(`/servico/add-servico-cliente/${id}`, {
            servicosServicoId: data.servicoid
        }).then(({ data }) => {
            console.log(data);
        })
            .catch(error => {
                console.log(error);
                alert("Cliente já tem esse servico!");
            });
    }, [])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IForm>({
        mode: 'onBlur',
    });

    return (
        <section>
            <header>
                <NavBar_ />
            </header>
            <main>
                <Card
                    bg="white"
                    text="dark"
                    style={{ width: '18rem' }}
                    className="mb-2"
                >
                    <Card.Header>Serviços já consumidos</Card.Header>
                    <Card.Body>
                        {cliente && cliente.servicos.map(s => {
                            return (
                                <>
                                    <Card.Text>
                                        Serviço: {s.servico_nome}
                                    </Card.Text>
                                    <Card.Text>
                                        Valor: {s.servico_valor}
                                    </Card.Text>
                                    <Card.Text>
                                        <Button onClick={() => deletar(s.servico_id)}>Deletar</Button>
                                    </Card.Text>
                                </>
                            )
                        })}
                    </Card.Body>
                </Card>
                <h1>Cliente: "{cliente?.cliente_nome}"</h1>
                <div className="forms">
                    <form onSubmit={handleSubmit(adicionarServico)}>
                        <select
                            placeholder={
                                'Selecione o servico'
                            }
                            {...register('servicoid')}>
                            {servico && servico.map(i => {
                                return (
                                    <option key={i.servico_id} value={i.servico_id}>
                                        {i.servico_nome}
                                    </option>
                                )
                            })}
                        </select>

                        <Button className="submit" variant="outline-dark" type='submit'>Adicionar</Button>{' '}
                    </form>
                </div>
            </main>
        </section >
    );
}
export default ClienteServico;