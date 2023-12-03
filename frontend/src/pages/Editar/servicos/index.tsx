import { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar_ from '../../../component/NavBar'
import IServico from '../../../interface/servico';
import { service } from '../../../service/serve';

interface UpdateServico {
    servico_id: number;
    servico_nome: string;
    servico_valor: number;
}

function EditarServico() {

    const [servico, setServico] = useState<IServico>()
    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        getOne()
    })

    async function getOne() {
        const response = await service.get<IServico>(`servico/findOne/${id}`)
        setServico(response.data)
    }
    const updateServico = useCallback(
        async (data: UpdateServico) => {
            await service
                .put<UpdateServico>(
                    `/servico/editServico/${id}`,
                    {
                        servico_nome: data.servico_nome,
                        servico_valor: data.servico_valor
                    }
                ).then(({ data }) => {
                    console.log(data);
                    navigate('/servicos')
                }).catch(error => {
                    console.log(error);
                })
        }, []
    )
    const onSubmit = useCallback(
        async (data: UpdateServico) => {
            updateServico(data)
        }, [updateServico]
    )

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateServico>({
        mode: 'onBlur',
    });

    return (
        <section>
            <header>
                <NavBar_/>
            </header>
            <main>
                <h1>Editar Serviço: "{servico?.servico_nome}"</h1>
                <Button variant="outline-dark" href='/servicos'>Voltar</Button>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="field">
                        <label htmlFor="Nome" >Nome do Serviço:</label>
                        <input type="text" placeholder={servico?.servico_nome} required {...register('servico_nome')} />
                    </div>
                    <div className="field">
                        <label htmlFor="Nome" >Valor do Serviço:</label>
                        <input type="text" required {...register('servico_valor')} />
                    </div>
                    <Button className="submit" variant="outline-dark" type='submit'>Editar</Button>{' '}
                </form>
            </main>
        </section>
    )
};

export default EditarServico;