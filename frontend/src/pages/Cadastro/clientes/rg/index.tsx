import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import NavBar_ from '../../../../component/NavBar';
import ICliente from '../../../../interface';
import { service } from '../../../../service/serve';

interface cadastrarRG {
    rg_id: number,
    rg_valor: string,
    rg_dataEmissao: string,
    cliente: number
}

function CadastrarRG() {
    const { id } = useParams()
    const [cliente, setCliente] = useState<ICliente>()
    useEffect(() => {
        getOne()
    })
    async function getOne() {
        const response = await service.get<ICliente>(`/cliente/achar-cliente/${id}`)
        setCliente(response.data)
    }
    const navigate = useNavigate();
    
    const cadastrarRG = useCallback(
        async (data: cadastrarRG) => {
            await service.post<cadastrarRG>(
                `cliente/enviar-rg`, {
                rg_dataEmissao: data.rg_dataEmissao,
                rg_valor: data.rg_valor,
                cliente: id
            }
            ).then(({ data }) => {
                navigate(-1)
            }).catch(error => {
                console.log(error);
            })
        }, []
    )
    const onSubmit = useCallback(
        async (data: cadastrarRG) => {
            cadastrarRG(data)
        }, [cadastrarRG]
    )
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<cadastrarRG>({
        mode: 'onBlur',
    });
    return (
        <section>
            <header>
                <NavBar_ />
            </header>
            <main>
                <h1>Adicionar RG para {cliente?.cliente_nome}</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="field">
                        <label htmlFor="Nome" >RG:</label>
                        <input type="text" required {...register('rg_valor')} />
                    </div>
                    <div className="field">
                        <label htmlFor="Nome" >Data:</label>
                        <input type="date" required {...register('rg_dataEmissao')} />
                    </div>
                    <Button className="submit" variant="outline-dark" type='submit'>Cadastrar</Button>{' '}

                </form>
            </main>
        </section>
    )
};

export default CadastrarRG;