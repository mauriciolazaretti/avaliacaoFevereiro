using DataAccess;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AplicacaoBackend.Servicos
{
    public class ProdutoService : IProduto
    {
        private DataContext dataContext;
        private readonly ILogger<Produto> logger;
        public ProdutoService(DataContext dataContext, ILogger<Produto> logger)
        {
            this.dataContext = dataContext;
            this.logger = logger;
        }
        public async Task<Produto> buscaPorId(int id)
        {
            var prod = await dataContext.Produtos.FirstOrDefaultAsync(o => o.Id == id);
            return prod;
        }

        public async Task<List<Produto>> buscaTodos()
        {
            var lista =  await dataContext.Produtos.ToListAsync();
            return lista;
        }

        public async Task<bool> delete(int id)
        {
            var p = dataContext.Produtos.FirstOrDefault(o => o.Id == id);
            if (p == null) return false;
            try
            {
                dataContext.Produtos.Remove(p);
                await dataContext.SaveChangesAsync();
                logger.LogInformation($"excluiu o objeto  de id == {id}");
                return true;
            }
            catch (Exception ex)
            {
                logger.LogError("Ocorreu um erro ao remover o produto " + ex.Message + ex.StackTrace);
                return false;
            }
            
           
        }

        public async Task<bool> save(Produto p)
        {
            try
            {
                if (p.Id == 0)
                {
                    dataContext.Produtos.Add(p);
                    logger.LogInformation($"criou objeto de id == {p.Id}");
                }else{
                    var produto = await dataContext.Produtos.FirstOrDefaultAsync(o => o.Id == p.Id);
                    if(produto != null){
                        produto.Valor = p.Valor;
                        produto.Descricao = p.Descricao;
                        produto.Nome = p.Nome;
                    } 
                }
                await dataContext.SaveChangesAsync();
                return true;
            }catch(Exception ex)
            {
                logger.LogInformation($"erro do objeto id == {p.Id} ao salvar {ex.Message} {ex.StackTrace}");
                return false;
            }
        }
    }
}
