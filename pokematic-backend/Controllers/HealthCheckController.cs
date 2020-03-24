using Microsoft.AspNetCore.Mvc;

namespace pokematic_backend.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class HealthCheckController : ControllerBase
    {
        [HttpGet]
        public ActionResult GetSystemStatus()
        {
            return Ok("API online");
        }
    }
}