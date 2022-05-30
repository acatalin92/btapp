using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RemunerationAPI.Data;
using RemunerationAPI.Data.Models;

namespace RemunerationAPI.Controllers
{
    [ApiController]
    [Route("sales")]
    public class SalesController : ControllerBase
    {
        private readonly DataContext dataContext;

        public SalesController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet()]
        public ActionResult<List<Sale>> Get()
        {
            var result = dataContext.Sales
                .Include(sale => sale.Salesperson)
                .Include(sale => sale.Product)
                .ToList();

            return Ok(result);
        }

        [HttpPut()]
        public ActionResult<List<Sale>> Upsert([FromBody] Sale sale)
        {
            var previous = dataContext.Sales.Find(sale.Id);
            var salesperson = dataContext.Salespersons.Find(sale.Salesperson.Id);
            var product = dataContext.Products.Find(sale.Product.Id);

            if (salesperson == null)
            {
                return BadRequest("Related salesperson not found");
            }

            if (product == null)
            {
                return BadRequest("Related product not found");
            }

            sale.Salesperson = salesperson;
            sale.Product = product;

            if (previous != null)
            {
                dataContext.Entry(previous).CurrentValues.SetValues(sale);
            }
            else
            {
                dataContext.Add(sale);
            }

            dataContext.SaveChanges();

            var result = dataContext.Sales
                .Include(sale => sale.Salesperson)
                .Include(sale => sale.Product)
                .ToList();

            return Ok(result);
        }
    }
}
