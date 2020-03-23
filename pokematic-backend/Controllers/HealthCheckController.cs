using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace pokematic_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HealthCheckController : ControllerBase
    {
        public HealthCheckController()
        {
            // TO DO
        }

        [HttpGet]
        public ActionResult GetHealthStatus()
        {
            return Ok("API online");
        }
    }
}