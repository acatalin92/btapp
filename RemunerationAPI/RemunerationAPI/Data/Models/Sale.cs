using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RemunerationAPI.Data.Models
{
    [Index(nameof(Year), nameof(Month), "SalespersonId",  "ProductId", IsUnique = true)]
    public class Sale
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [Range(0, 9999)]
        public int Year { get; set; }

        [Required]
        [Range(1, 12)]
        public int Month { get; set; }

        [Required]
        [ForeignKey("SalespersonId")]
        public virtual Salesperson Salesperson { get; set; }

        [Required]
        [ForeignKey("ProductId")]
        public virtual Product Product { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int Quantity { get; set; }
    }
}
