using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using pokematic_backend.Models;
using pokematic_backend.Services;

namespace pokematic_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeamController : ControllerBase
    {
        private readonly TeamService _teamService;

        public TeamController(TeamService teamService)
        {
            _teamService = teamService;
        }
        
        [HttpGet]
        public string GetAllTeam()
        {
            return _teamService.GetAllTeams();
        }
        
        [HttpPost("create")]
        public async Task<Team> CreateTeam(Team team)
        {
            _teamService.Create(team);
            return team;
        }

        [HttpGet("{name}")]
        public async Task<Team> GetTeam(string name)
        {
            var team = _teamService.Get(name);
            return await team;
        }
    }
}