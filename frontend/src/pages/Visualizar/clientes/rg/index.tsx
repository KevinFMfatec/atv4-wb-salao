import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import NavBar_ from '../../../../component/NavBar';
import ICliente from '../../../../interface';
import { service } from '../../../../service/serve';

interface UpdateRG {
    rg_id: number,
    rg_valor: string,
    rg_dataEmissao: string,
}

function EditarRG() {
    const { id, rg } = useParams()
    const [cliente, setCliente] = useState<ICliente>()
    useEffect(() => {
        getOne()
    })
    async function getOne() {
        const response = await service.get<ICliente>(`/cliente/achar-cliente/${id}`)
        setCliente(response.data)
    }
    const navigate = useNavigate();

    const rgUpdate = useCallback(
        async (data: UpdateRG) => {
            await service.put<UpdateRG>(
                `cliente/atualizar-cliente-rg/${id}/${rg}`, {
                rg_dataEmissao: data.rg_dataEmissao,
                rg_valor: data.rg_valor
            }
            ).then(({ data }) => {
                navigate(-1)
            }).catch(error => {
                console.log(error);
            })
        }, []
    )
    const onSubmit = useCallback(
        async (data: UpdateRG) => {
            rgUpdate(data)
        }, [rgUpdate]
    )
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateRG>({
        mode: 'onBlur',
    });
    return (
        <section>
            <header>
                <NavBar_ />
            </header>
            <main>
                {cliente?.rg.filter(fill => fill.rg_id === Number(rg)).map(
                    i => {
                        return (
                            <>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="field">
                                        <label htmlFor="Nome" >RG:</label>
                                        <input type="text" placeholder={i.rg_valor} required {...register('rg_valor')} />
                                    </div>
                                    <div className="field">
                                        <label htmlFor="Nome" >Data:</label>
                                        <input type="date" defaultValue={i.rg_dataEmissao} required {...register('rg_dataEmissao')} />
                                    </div>
                                    <Button className="submit" variant="outline-dark" type='submit'>Editar</Button>{' '}

                                </form>
                            </>
                        )
                    }
                )}
            </main>
        </section>
    )
};

export default EditarRG;