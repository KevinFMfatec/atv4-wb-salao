import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import NavBar_ from '../../../../component/NavBar';
import ICliente from '../../../../interface';
import { service } from '../../../../service/serve';

interface cadastrarTelefone {
    telefone: string
}

function CadastrarTelefone() {
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
        async (data: cadastrarTelefone) => {
            await service.post<cadastrarTelefone>(
                `cliente//enviar-telefone`, {
                telefone_ddd: data.telefone.split(' ')[0],
                telefone_numero: data.telefone.split(' ')[1],
                cliente: id
            }
            ).then(({ data }) => {
                console.log(data)
            }).catch(error => {
                console.log(error);
            })
        }, []
    )
    const onSubmit = useCallback(
        async (data: cadastrarTelefone) => {
            cadastrarRG(data)
        }, [cadastrarRG]
    )
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<cadastrarTelefone>({
        mode: 'onBlur',
    });
    return (
        <section>
            <header>
                <NavBar_ />
            </header>
            <main>
                <h1>Adicionar Telefone para {cliente?.cliente_nome}</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="field">
                        <label htmlFor="Nome" >Telefone:</label>
                        <input type="text" placeholder='XX XXXXXXXXX' required {...register('telefone')} />
                    </div>
                    <Button className="submit" onClick={() => navigate(-1)} variant="outline-dark" type='submit'>Cadastrar</Button>{' '}
                </form>
            </main>
        </section>
    )
};

export default CadastrarTelefone;