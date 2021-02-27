using AplicacaoBackend.Servicos;
using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AplicacaoBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutoController : ControllerBase
    {
        private IProduto produtoService;
        public ProdutoController(IProduto produtoService)
        {
            this.produtoService = produtoService;
        }
        // GET: api/<ProdutoController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await produtoService.buscaTodos());
        }

        // GET api/<ProdutoController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await produtoService.buscaPorId(id));
        }

        // POST api/<ProdutoController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Produto p)
        {
            var criou = await produtoService.save(p);
            if (!criou)
                return BadRequest();
            return Ok(p);
        }


        // PUT api/<ProdutoController>/5
        [HttpPut()]
        public async Task<IActionResult> Put([FromBody] Produto p)
        {
            var atualizou = await produtoService.save(p);
            if (!atualizou)
                return BadRequest();
            return Ok(p);
        }

        // DELETE api/<ProdutoController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var excluiu = await produtoService.delete(id);
            if (!excluiu)
                return BadRequest();
            return Ok();
        }
    }
}
