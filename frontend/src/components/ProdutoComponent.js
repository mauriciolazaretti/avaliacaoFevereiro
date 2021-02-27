import React from 'react';
import ProdutoService from '../services/ProdutoService';
import { Table, Button, Container, Row, Col, Modal,Form, FormControl, FormLabel, FormGroup} from 'react-bootstrap';
class ProdutoComponent extends React.Component {
    produtoService = new ProdutoService();
    constructor(props) {
      super(props);
      this.state = {
      listaProdutos: [],
      mostraTabela: true,
      produtoSelecionado: {
            id: 0,
            nome: '',
            descricao: '',
            valor: 0.00
        }
      };
      this.abrirModal = this.abrirModal.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.saveProduto = this.saveProduto.bind(this);
      this.editar = this.editar.bind(this);
    }
    editar(id){
        this.produtoService.buscarProduto(id)
            .then(o => o.json())
            .then((result) => {
                console.log(result);
                this.setState({
                    produtoSelecionado: result,
                    mostraTabela: false
                });
                
            }, (error) => {
                alert("erro url" + error );
            });
    }
    handleClose(){
        this.setState({
            mostraTabela: true
        });
    }
    componentDidMount() {
       this.carregaProdutos();
    }
    carregaProdutos(){
        this.produtoService.listarTodos()
        .then(o => o.json())
        .then( (result) => {
            console.log(result);
         this.setState({
             listaProdutos: result,
             mostraTabela: true
         });
        }, (error) => {
         alert("erro url" + error );
        });
    }
    abrirModal(){
        this.setState({
            mostraTabela: false
        });
    }
    saveProduto(){
        if(this.state.produtoSelecionado.Id == 0 ){
            this.produtoService.save(this.state.produtoSelecionado)
            .then(o => o.json())
            .then((result) => {
                this.setState({
                    mostraTabela: true,
                    produtoSelecionado: {
                        Id: 0,
                        Nome: '',
                        Descricao: '',
                        Valor: 0.00
                    }
                });
                alert('produto salvo com sucesso!');
                this.carregaProdutos();
            }, (error) => {
                alert("erro ao salvar produto " +error);
                this.carregaProdutos();
                
            });
        }else{
            this.produtoService.update(this.state.produtoSelecionado)
            .then(o => o.json())
            .then((result) => {
                this.setState({
                    mostraTabela: true,
                    produtoSelecionado: {
                        Id: 0,
                        Nome: '',
                        Descricao: '',
                        Valor: 0.00
                    }
                });
                alert('produto atualizado com sucesso!');
                this.carregaProdutos();
            }, (error) => {
                alert("erro ao salvar produto " +error);
                this.carregaProdutos();
                
            });
        }
    }
    delete(id){
        this.produtoService.delete(id)
        .then(o => {
            alert('excluido com sucesso');
            this.carregaProdutos();
        }, falha => {
            alert('erro '+ falha)
        });
    }
    handleBindingProd(e, nome){
        let obj = this.state.produtoSelecionado;
        obj[nome] = e.target.value;
        this.setState({
            produtoSelecionado: obj
        });
        console.log(this.state.produtoSelecionado);
    }
    render() {
        let rows = [];
        for(let i = 0; i < this.state.listaProdutos.length ; i++){
            rows.push(this.state.listaProdutos[i]);
        }
        console.log(rows);
       return (
          <div id="produtoComponent">
              <Container>
                  <Row>
                    <Col md={3}><Button block onClick={this.abrirModal}>Novo Produto</Button></Col>
                  </Row>
                  <Row>
                      <Col>
                        <h4>Produtos</h4>
                       </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead key={'thead'}>
                                <tr key={-1}>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th>Valor</th>
                                <th>Opções</th>
                                </tr>
                            </thead>
                            <tbody key={'tbody'}>
                                { this.state.listaProdutos.length > 0 ? this.state.listaProdutos.map(( obj, index ) => {
                                        return (
                                            <tr key={obj.id}>
                                                <td>{obj.id}</td>
                                                <td>{obj.nome}</td>
                                                <td>{obj.descricao}</td>
                                                <td>{obj.valor}</td>
                                                <td>
                                                    <Button onClick={() => this.editar(obj.id)}> Editar </Button>
                                                    <Button onClick={() => this.delete(obj.id)}> Excluir </Button>
                                                </td>
                                            </tr>
                                        );
                                        }) : <tr><td colSpan="5">Sem dados no banco de dados</td></tr>}
                            </tbody>
                        </Table>
                    </Col>
                   </Row>
                   <Row>
                       <Col>
                       <Modal show={!this.state.mostraTabela}>
                            <Modal.Header>
                            <Modal.Title>Novo Produto</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Container>
                                    <Row>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Nome</Form.Label>
                                            <Form.Control type="text" placeholder="Insira Nome" onChange={(e) => this.handleBindingProd(e, 'nome')} value={this.state.produtoSelecionado.nome} />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Descrição</Form.Label>
                                            <Form.Control type="text" placeholder="Insira Descrição" onChange={(e) => this.handleBindingProd(e, 'descricao')} value={this.state.produtoSelecionado.descricao}  />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Valor</Form.Label>
                                            <Form.Control type="text" placeholder="00.00"  onChange={(e) => this.handleBindingProd(e, 'valor')} value={this.state.produtoSelecionado.valor} />
                                        </Form.Group>
                                    </Row>
                                </Container>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Fechar
                            </Button>
                            <Button variant="primary" onClick={this.saveProduto}>
                                Salvar
                            </Button>
                            </Modal.Footer>
                        </Modal>
                       </Col>
                   </Row>
               </Container>
          </div>
            
       );
    }
}
export default ProdutoComponent;
  