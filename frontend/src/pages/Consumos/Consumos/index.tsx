/* eslint-disable react/jsx-pascal-case */
import * as React from 'react';
import { Button, Table } from 'react-bootstrap';
import NavBar_ from '../../../component/NavBar'

function Consumos() {
    return (
        <section>
            <header>
                <NavBar_/>
            </header>
            <main>
                <h1>Consumos</h1>
                <div className="tables">
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                            <th>Nome</th>
                            <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Listagem 10 clientes que mais consumiram em qtd</td>
                                <td>
                                    <Button variant="outline-info">Visualizar</Button>{' '}
                                </td>
                            </tr>
                            <tr>
                                <td>Listagem todos clientes por gênero</td>
                                <td>
                                    <Button variant="outline-info">Visualizar</Button>{' '}
                                </td>
                            </tr>
                            <tr>
                                <td>Listagem geral de produtos e serviços mais consumidos</td>
                                <td>
                                    <Button variant="outline-info">Visualizar</Button>{' '}
                                </td>
                            </tr>
                            <tr>
                                <td>Listagem 10 clientes que menos consumiram produtos ou serviços</td>
                                <td>
                                    <Button variant="outline-info">Visualizar</Button>{' '}
                                </td>
                            </tr>
                            <tr>
                                <td>Listagem 5 clientes que mais consumiram em valor</td>
                                <td>
                                    <Button variant="outline-info">Visualizar</Button>{' '}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </main>
        </section>
    );
}

export default Consumos;