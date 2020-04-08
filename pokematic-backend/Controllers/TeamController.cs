using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using pokematic_backend.Models;
using pokematic_backend.Services;
using Task = System.Threading.Tasks.Task;

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
        public async Task<List<Team>> GetAllTeams()
        {
            return _teamService.GetAllTeams();
        }
        
        [HttpPost("createTeam")]
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

        [HttpGet("goals")]
        public async Task<List<Goal>> GetGoals(string teamName)
        {
            var goals = _teamService.GetGoals(teamName);
            return goals;
        }

        [HttpGet("tasks")]
        public async Task<List<Models.Task>> GetTasks(string teamName)
        {
            var tasks = _teamService.GetTasks(teamName);
            return tasks;
        }

        [HttpPost("createGoal")]
        public async Task<Goal> CreateGoal(Goal goal, string teamName)
        {
            _teamService.CreateGoal(goal, teamName);
            return goal;
        }

        [HttpPost("createTask")]
        public async Task<Models.Task> CreateTask(Models.Task task, string goalName, string teamName)
        {
            _teamService.CreateTask(task, goalName, teamName);
            return task;
        }
        
        /*
         * Update task and goal status
         */
        
        
        /*
         * Approving tasks
         */
        
        
    }
}