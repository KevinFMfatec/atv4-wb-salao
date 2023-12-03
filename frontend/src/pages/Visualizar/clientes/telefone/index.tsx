import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import NavBar_ from '../../../../component/NavBar';
import ICliente from '../../../../interface';
import { service } from '../../../../service/serve';

interface updateTelefone {
    telefone: string,
}

function EditarTelefone() {
    const { id, tell } = useParams()
    const [cliente, setCliente] = useState<ICliente>()
    useEffect(() => {
        getOne()
    })
    async function getOne() {
        const response = await service.get<ICliente>(`/cliente/achar-cliente/${id}`)
        setCliente(response.data)
    }
    const navigate = useNavigate();

    const tellUpdate = useCallback(
        async (data: updateTelefone) => {
            await service.put<updateTelefone>(
                `cliente/atualizar-cliente-telefone/${id}/${tell}`, {
                telefone_ddd: data.telefone.split(' ')[0],
                telefone_numero: data.telefone.split(' ')[1]
            }
            ).then(({ data }) => {
                navigate(-1)
            }).catch(error => {
                console.log(error);
            })
        }, []
    )
    const onSubmit = useCallback(
        async (data: updateTelefone) => {
            tellUpdate(data)
        }, [tellUpdate]
    )
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<updateTelefone>({
        mode: 'onBlur',
    });
    return (
        <section>
            <header>
                <NavBar_ />
            </header>
            <main>
                {cliente && cliente?.telefones.filter(fill => fill.telefone_id === Number(tell)).map(
                    i => {
                        return (
                            <>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="field">
                                        <label htmlFor="Nome" >Telefone:</label>
                                        <input type="text" placeholder={i.telefone_ddd + ' ' + i.telefone_numero} {...register('telefone')} />
                                    </div>
                                    <Button className="submit"  variant="outline-dark" type='submit'>Editar</Button>{' '}
                                </form>
                            </>
                        )
                    }
                )}
            </main>
        </section>
    )
};

export default EditarTelefone;