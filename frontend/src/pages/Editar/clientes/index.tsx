/* eslint-disable react/jsx-pascal-case */
import { useParams } from 'react-router-dom';
import ICliente from '../../../interface/';
import { useState, useCallback, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavBar_ from '../../../component/NavBar'
import { useForm } from 'react-hook-form';
import { service } from '../../../service/serve'

interface UpdateCliente {
    cliente_nome: string;
    cliente_nomeSocial: string;
    cliente_genero: string;
}
function EditarCliente() {
    const navigate = useNavigate();
    const [cliente, setCliente] = useState<ICliente>()
    const { id } = useParams()
    useEffect(() => {
        getOne()
    })
    async function getOne() {
        const response = await service.get<ICliente>(`cliente/achar-cliente/${id}`)
        setCliente(response.data)
    }

    const clienteUpdate = useCallback(
        async (data: UpdateCliente) => {
            await service
                .put<UpdateCliente>(
                    `/cliente/atualizar-cliente/${id}`,
                    {
                        cliente_nome: data.cliente_nome,
                        cliente_nomeSocial: data.cliente_nomeSocial,
                        cliente_genero: data.cliente_genero,
                    }
                )
                .then(({ data }) => {
                    console.log(data);
                    navigate('/clientes');
                })
                .catch(error => {
                    console.log(error);
                });
        },
        [],
    )
    const onSubmit = useCallback(
        async (data: UpdateCliente) => {
            clienteUpdate(data)
        }, [clienteUpdate]
    )

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateCliente>({
        mode: 'onBlur',
    });
    return (
        <section>
            <header>
                <NavBar_ />
            </header>
            <main>
                <h1>Editar Cliente: {cliente?.cliente_nome}</h1>
                <div className="forms">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="field">
                            <label htmlFor="Nome" >Nome:</label>
                            <input type="text" placeholder={cliente?.cliente_nome} required {...register('cliente_nome')} />
                        </div>
                        <div className="field">
                            <label htmlFor="Social">Nome social:</label>
                            <input type="text" placeholder={cliente?.cliente_nomeSocial} {...register('cliente_nomeSocial')} required />
                        </div>
                        <div className="field">
                            <label htmlFor="Genero">Gênero:</label>
                            <select
                                required {...register('cliente_genero')}>
                                <option>Selecione uma opção</option>
                                <option key='Feminino' value='Feminino'>Feminino</option>
                                <option key='Masculino' value='Masculino'>Masculino</option>
                            </select>
                        </div>
                        <Button className="submit" variant="outline-dark" type='submit'>Editar</Button>{' '}
                    </form>
                </div>
            </main>
        </section>
    );
}

export default EditarCliente;