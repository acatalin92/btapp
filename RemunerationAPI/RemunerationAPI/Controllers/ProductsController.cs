using Microsoft.AspNetCore.Mvc;
using RemunerationAPI.Data;
using RemunerationAPI.Data.Models;

namespace RemunerationAPI.Controllers
{
    [ApiController]
    [Route("products")]
    public class ProductsController : ControllerBase
    {
        private readonly DataContext dataContext;

        public ProductsController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet()]
        public ActionResult<List<Product>> Get()
        {
            var result = dataContext.Products.ToList();

            return Ok(result);
        }
    }
}
