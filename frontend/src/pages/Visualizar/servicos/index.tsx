import { useCallback, useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import NavBar_ from '../../../component/NavBar';
import IServico from '../../../interface/servico';
import './styles.css';
import { service } from '../../../service/serve';

function VisualizarServico() {
    const [servico, setServico] = useState<IServico>()
    const { id } = useParams()

    useEffect(() => {
        getOne()
    })

    async function getOne() {
        const response = await service.get<IServico>(`servico/findOne/${id}`)
        setServico(response.data)
        console.log(response.data)
    }
    return(
        <section>
            <header>
                <NavBar_/>
            </header>
            <main>
                <h1>Visualizar Serviço: "{servico?.servico_nome}"</h1>
                <Button variant="outline-dark" href='/servicos'>Voltar</Button>
                <Card
                bg="white"
                text="dark"
                style={{ width: '18rem' }}
                className="mb-2"
                >
                    <Card.Header>ID:{servico?.servico_id}</Card.Header>
                    <Card.Body>
                        <Card.Title>{servico?.servico_nome}</Card.Title>
                        <Card.Text>
                            Preço: R${servico?.servico_valor}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </main>
        </section>
    )
};

export default VisualizarServico;