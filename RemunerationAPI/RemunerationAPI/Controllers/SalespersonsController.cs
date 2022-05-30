using Microsoft.AspNetCore.Mvc;
using RemunerationAPI.Data;
using RemunerationAPI.Data.Models;

namespace RemunerationAPI.Controllers
{
    [ApiController]
    [Route("salespersons")]
    public class SalepersonsController : ControllerBase
    {
        private readonly DataContext dataContext;

        public SalepersonsController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet()]
        public ActionResult<List<Salesperson>> Get()
        {
            var result = dataContext.Salespersons.ToList();

            return Ok(result);
        }
    }
}
