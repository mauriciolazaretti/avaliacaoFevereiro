import urlApi from '../url';

class ProdutoService {
    buscarProduto(id){
        return fetch(`${urlApi}produto/${id}`);
    }

    listarTodos(){
        return fetch(`${urlApi}produto`);
    }

    save(produto){
        return fetch(`${urlApi}produto`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(produto)
        });
    }

    update(produto){
        return fetch(`${urlApi}produto`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(produto)
        });
    }

    delete(id){
        return fetch(`${urlApi}produto/${id}`,{
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
        });
    }
}

export default ProdutoService;