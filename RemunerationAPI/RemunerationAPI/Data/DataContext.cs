using Microsoft.EntityFrameworkCore;
using RemunerationAPI.Data.Models;

namespace RemunerationAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Salesperson> Salespersons { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Remuneration> Remunerations { get; set; }
        public DbSet<Sale> Sales { get; set; }
    }
}
