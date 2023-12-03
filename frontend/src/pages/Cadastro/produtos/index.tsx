/* eslint-disable react/jsx-pascal-case */
import { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import NavBar_ from '../../../component/NavBar'
import { service } from '../../../service/serve';

interface cadastroProduto {
    produto_nome: string,
    produto_valor: number,
}
function CadastrarProdutos() {
    const navigate = useNavigate()
    const cadastroProduto = useCallback(
        async (data: cadastroProduto) => {
            await service.post<cadastroProduto>(`produto/add-produto`, {
                produto_nome: data.produto_nome,
                produto_valor: data.produto_valor
            })
                .then(({ data }) => {
                    console.log(data);
                    navigate('/produtos')
                })
                .catch(error => {
                    console.log(error);
                });
        },
        [],
    )
    const onSubmit = useCallback(
        async (data: cadastroProduto) => {
            cadastroProduto(data)
        }, [cadastroProduto]
    )
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<cadastroProduto>({
        mode: 'onBlur',
    });
    return (
        <section>
            <header>
                <NavBar_ />
            </header>
            <main>
                <h1>Cadastrar Produto</h1>
                <div className="forms">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="field">
                            <label htmlFor="Produto">Produto:</label>
                            <input type="text" {...register('produto_nome')} />
                        </div>
                        <div className="field">
                            <label htmlFor="Preco">Preço:</label>
                            <input type="text" {...register('produto_valor')} />
                        </div>
                        <Button className="submit" variant="outline-dark" type='submit'>Cadastrar</Button>{' '}
                    </form>
                </div>
            </main>
        </section>
    );
}

export default CadastrarProdutos;