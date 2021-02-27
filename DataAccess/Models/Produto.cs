using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataAccess.Models
{
    public class Produto
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [StringLength(80)]
        [Required]
        public string Nome { get; set; }
        [StringLength(100)]
        [Required]
        public string Descricao { get; set; }
        [Column(TypeName ="decimal(20,2)")]
        [Required]
        public decimal Valor { get; set; }
    }
}
