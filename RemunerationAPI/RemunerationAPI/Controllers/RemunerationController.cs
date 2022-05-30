using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RemunerationAPI.Data;
using RemunerationAPI.Data.Models;
using RemunerationAPI.Models;

namespace RemunerationAPI.Controllers
{
    [ApiController]
    [Route("remunerations")]
    public class RemunerationsController : ControllerBase
    {
        private readonly DataContext dataContext;

        public RemunerationsController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet()]
        public ActionResult<List<Remuneration>> Get()
        {
            var result = dataContext.Remunerations
                .Include(remuneration => remuneration.Product)
                .ToList();

            return Ok(result);
        }

        [HttpGet("/remunerations/monthly-report/{year}/{month}")]
        public ActionResult<List<RemunerationMonthlyReport>> GetMonthlyReport(int year, int month)
        {
            var remunerations = dataContext.Remunerations
                .Where(remuneration => remuneration.Year == year)
                .Where(remuneration => remuneration.Month == month)
                .Include(remuneration => remuneration.Product)
                .ToList()
                .GroupBy(remuneration => remuneration.Product.Id)
                .ToDictionary(group => group.Key, group => group.ToList().First());

            var result = dataContext.Sales
                .Where(sale => sale.Year == year)
                .Where(sale => sale.Month == month)
                .Include(sale => sale.Salesperson)
                .Include(sale => sale.Product)
                .ToList()
                .GroupBy(sale => sale.Product.Id)
                .SelectMany(group => group.ToList().ConvertAll(sale => new RemunerationMonthlyReport
                {
                    Salesperson = sale.Salesperson,
                    Product = sale.Product,
                    Amount = sale.Quantity * remunerations[sale.Product.Id].Amount
                }))
                .ToList();

            return Ok(result);
        }
    }
}
