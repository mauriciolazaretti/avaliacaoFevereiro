using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AplicacaoBackend.Servicos
{
    public interface IProduto
    {
        public Task<Produto> buscaPorId(int id);
        public Task<List<Produto>> buscaTodos();
        public Task<bool> save(Produto p);
        public Task<bool> delete(int id);
    }
}
