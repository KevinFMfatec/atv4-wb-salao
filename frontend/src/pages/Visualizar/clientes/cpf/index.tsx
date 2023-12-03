import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import NavBar_ from '../../../../component/NavBar';
import ICliente from '../../../../interface';
import { service } from '../../../../service/serve';

interface UpdateCPF {
    cpf_id: number,
    cpf_valor: string,
    cpf_dataEmissao: string,
}

function EditarCPF() {
    const { id, cpf } = useParams()
    const [cliente, setCliente] = useState<ICliente>()
    useEffect(() => {
        getOne()
    })
    async function getOne() {
        const response = await service.get<ICliente>(`/cliente/achar-cliente/${id}`)
        setCliente(response.data)
    }
    const navigate = useNavigate();

    const cpfUpdate = useCallback(
        async (data: UpdateCPF) => {
            await service.put<UpdateCPF>(
                `/cliente/atualizar-cliente-cpf/${id}/${cpf}`, {
                cpf_dataEmissao: data.cpf_dataEmissao,
                cpf_valor: data.cpf_valor
            }
            ).then(({ data }) => {
                navigate(-1)
            }).catch(error => {
                console.log(error);
            })
        }, []
    )
    const onSubmit = useCallback(
        async (data: UpdateCPF) => {
            cpfUpdate(data)
        }, [cpfUpdate]
    )
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateCPF>({
        mode: 'onBlur',
    });
    return (
        <section>
            <header>
                <NavBar_ />
            </header>
            <main>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="field">
                        <label htmlFor="Nome" >CPF:</label>
                        <input type="text" placeholder={cliente?.cpf.cpf_valor} required {...register('cpf_valor')} />
                    </div>
                    <div className="field">
                        <label htmlFor="Nome" >CPF:</label>
                        <input type="date" defaultValue={cliente?.cpf.cpf_dataEmissao} required {...register('cpf_dataEmissao')} />
                    </div>
                    <Button className="submit" variant="outline-dark" type='submit'>Editar</Button>{' '}

                </form>
            </main>
        </section>
    )
};

export default EditarCPF;