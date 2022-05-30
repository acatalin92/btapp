using RemunerationAPI.Data.Models;

namespace RemunerationAPI.Models
{
    public class RemunerationMonthlyReport
    {
        public Product Product { get; set; }
        public Salesperson Salesperson { get; set; }
        public decimal Amount { get; set; }
    }
}
