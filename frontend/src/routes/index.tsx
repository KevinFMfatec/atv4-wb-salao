import {
    BrowserRouter as Router,
    Route, 
    Routes
} from 'react-router-dom';
import Home from '../pages/Home';
import Clientes from '../pages/Listagem/clientes';
import Produtos from '../pages/Listagem/produtos';
import Servicos from '../pages/Listagem/servicos';
import Consumos from '../pages/Consumos/Consumos';
import CadastrarClientes from '../pages/Cadastro/clientes';
import CadastrarProdutos from '../pages/Cadastro/produtos';
import CadastrarServico from '../pages/Cadastro/servicos';
import VisualizarCliente from '../pages/Visualizar/clientes';
import VisualizarProduto from '../pages/Visualizar/produtos';
import VisualizarServico from '../pages/Visualizar/servicos';
import EditarCliente from '../pages/Editar/clientes';
import EditarProduto from '../pages/Editar/produtos';
import ClienteServico from '../pages/Vincular/Servico-Cliente'
import ClienteProduto from '../pages/Vincular/Produto-Cliente'
import EditarRG from '../pages/Visualizar/clientes/rg'
import EditarCPF from '../pages/Visualizar/clientes/cpf'
import EditarTell from '../pages/Visualizar/clientes/telefone'
import CadastrarRG from '../pages/Cadastro/clientes/rg'
import CadatrarTelefone from '../pages/Cadastro/clientes/telefone'
import EditarServico from '../pages/Editar/servicos';

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/clientes' element={<Clientes/>}/>
                <Route path='/produtos' element={<Produtos/>}/>
                <Route path='/servicos' element={<Servicos/>}/>
                <Route path='/consumos' element={<Consumos/>}/>
                <Route path='/cadastrar_cliente' element={<CadastrarClientes/>}/>
                <Route path='/cadastrar_produto' element={<CadastrarProdutos/>}/>
                <Route path='/cadastrar_servico' element={<CadastrarServico/>}/>
                <Route path='/clientes/:id' element={<VisualizarCliente/>}/>
                <Route path='/produtos/:id' element={<VisualizarProduto/>}/>
                <Route path='/servicos/:id' element={<VisualizarServico/>}/>
                <Route path='/editar_cliente/:id' element={<EditarCliente/>}/>
                <Route path='/editar_produto/:id' element={<EditarProduto/>}/>
                <Route path='/editar_servico/:id' element={<EditarServico/>}/>
                <Route path='/cadastrar_produto_servico/:id' element={<ClienteServico/>}/>
                <Route path='/cadastrar_produto/:id' element={<ClienteProduto/>}/>
                <Route path='/editar_rg/:id/:rg' element={<EditarRG/>}/>
                <Route path='/editar_cpf/:id/:cpf' element={<EditarCPF/>}/>
                <Route path='/editar_tell/:id/:tell' element={<EditarTell/>}/>
                <Route path='/cadastrar_rg/:id' element={<CadastrarRG/>}/>
                <Route path='/cadastrar_telefone/:id' element={<CadatrarTelefone/>}/>
            </Routes>
        </Router>
    );
}

export default AppRoutes;