/* eslint-disable react/jsx-pascal-case */
import { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import NavBar_ from '../../../component/NavBar'
import {service} from '../../../service/serve'

interface CadastroServico{
    servico_nome: string;
    servico_valor: number;
}

function CadastrarServico() {

    const navigate = useNavigate()
    const cadastroservico = useCallback (
        async (data:CadastroServico) => {
            await service.post <CadastroServico> (`/servico/add-servico`,{servico_nome: data.servico_nome, servico_valor: data.servico_valor}).then(({data}) => {
                navigate ('/servicos')
            }).catch(error => {console.log(error);
            })
        },[]
    )
    const onSubmit = useCallback (
        async (data:CadastroServico) => {
            cadastroservico(data)
        },[cadastroservico]
    )
    const {register, handleSubmit} = useForm <CadastroServico> ({mode:'onBlur'})

    return (
        <section>
            <header>
                <NavBar_/>
            </header>
            <main>
                <h1>Cadastrar Serviço</h1>
                <div className="forms">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="field">
                            <label htmlFor="Servico">Serviço:</label>
                            <input type="text"{...register('servico_nome')}/>
                        </div>
                        <div className="field">
                            <label htmlFor="Preco">Preço:</label>
                            <input type="text" {...register('servico_valor')}/>
                        </div>
                        <Button className="submit" variant="outline-dark" type='submit'>Cadastrar</Button>{' '}
                    </form>
                </div>
            </main>
        </section>
    );
}

export default CadastrarServico;