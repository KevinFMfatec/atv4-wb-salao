
import { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar_ from '../../../component/NavBar'
import IProduto from '../../../interface/produto';
import { service } from '../../../service/serve'

interface UpdateProduto {
    produto_id: number;
    produto_nome: string;
    produto_valor: number;
}

function EditarProduto() {
    const [produto, setProduto] = useState<IProduto>()
    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        getOne()
    })
    async function getOne() {
        const response = await service.get<IProduto>(`produto/findOne/${id}`)
        setProduto(response.data)
    }
    const updateProduto = useCallback(
        async (data: UpdateProduto) => {
            await service
                .put<UpdateProduto>(
                    `/produto/editProduto/${id}`,
                    {
                        produto_nome: data.produto_nome,
                        produto_valor: data.produto_valor
                    }
                ).then(({ data }) => {
                    console.log(data);
                    navigate('/produtos')
                }).catch(error => {
                    console.log(error);
                })
        }, []
    )
    const onSubmit = useCallback(
        async (data: UpdateProduto) => {
            updateProduto(data)
        }, [updateProduto]
    )

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateProduto>({
        mode: 'onBlur',
    });
    return (
        <section>
            <header>
                <NavBar_ />
            </header>
            <main>
                <h1>Editar Produto: "{produto?.produto_nome}"</h1>
                <Button variant="outline-dark" href='/produtos'>Voltar</Button>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="field">
                        <label htmlFor="Nome" >Nome do Produto:</label>
                        <input type="text" placeholder={produto?.produto_nome} required {...register('produto_nome')} />
                    </div>
                    <div className="field">
                        <label htmlFor="Nome" >Valor do Produto:</label>
                        <input type="text" required {...register('produto_valor')} />
                    </div>
                    <Button className="submit" variant="outline-dark" type='submit'>Editar</Button>{' '}
                </form>
            </main>

        </section>
    )
};

export default EditarProduto;