import { useCallback, useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import NavBar_ from '../../../component/NavBar';
import './styles.css';
import IProduto from '../../../interface/produto';
import { service } from '../../../service/serve'

function VisualizarProduto() {
    const [produto, setProduto] = useState<IProduto>()
    const { id } = useParams()

    useEffect(() => {
        getOne()
    })
    async function getOne() {
        const response = await service.get<IProduto>(`produto/findOne/${id}`)
        setProduto(response.data)
    }
    return (
        <section>
            <header>
                <NavBar_ />
            </header>
            <main>
                <h1>Visualizar Produto: "{produto?.produto_nome}"</h1>
                <Button variant="outline-dark" href='/produtos'>Voltar</Button>
                <Card
                    bg="white"
                    text="dark"
                    style={{ width: '18rem' }}
                    className="mb-2"
                >
                    <Card.Header>{produto?.produto_id}</Card.Header>
                    <Card.Body>
                        <Card.Title>{produto?.produto_nome}</Card.Title>
                        <Card.Text>
                            Preço: R${produto?.produto_valor}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </main>
        </section>
    )
};

export default VisualizarProduto