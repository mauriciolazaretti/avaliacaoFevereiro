using DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess
{
    public class DataContext : DbContext
    {
        public DbSet<Produto> Produtos { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder dbBuilder){
             dbBuilder.UseNpgsql("Host=database;Port=5432;Database=avaliacao_gs;Username=postgres;Password=123;",options => options.MigrationsAssembly("AplicacaoBackend"));
        }
        
    }
}
