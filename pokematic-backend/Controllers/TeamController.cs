using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using pokematic_backend.Models;
using pokematic_backend.Services;
using Task = System.Threading.Tasks.Task;

// TO DO
/*
 * updating task, updating goal (or progress of that goal)
 * approving tasks (PMs), updating EXP/LVL for teams, users to switch roles,
 * check for existing team (when trying to search for teams to be added into), login stuff,
 * adding a pokemon to team when they get a new pokemon, get all pokemon of that team’s collection,
 */

// DONE
/*
 * Get all teams, create team, get goals, get tasks, create goals,
 * create tasks, get user, create user, join a team,
 * 
 */


// TO DO
/*
 * updating task, updating goal (or progress of that goal)
 * approving tasks (PMs), updating EXP/LVL for teams, users to switch roles,
 * check for existing team (when trying to search for teams to be added into), login stuff,
 * adding a pokemon to team when they get a new pokemon, get all pokemon of that team’s collection,
 */

// DONE
/*
 * Get all teams, create team, get goals, get tasks, create goals,
 * create tasks, get user, create user, join a team,
 * 
 */


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
        public List<Team> GetAllTeams()
        {
            return _teamService.GetAllTeams();
        }
        
        [HttpPost("createTeam")]
        public  Team CreateTeam(Team team)
        {
            _teamService.Create(team);
            return team;
        }

        [HttpGet("{teamName}")]
        public Team GetTeam(string teamName)
        {
            var team = _teamService.Get(teamName);
            return team;
        }

        [HttpGet("goals/{teamName}")]
        public List<Goal> GetGoals(string teamName)
        {
            var goals = _teamService.GetGoals(teamName);
            return goals;
        }

        [HttpGet("tasks/{teamName}")]
        public List<Models.Task> GetTasks(string teamName)
        {
            var tasks = _teamService.GetTasks(teamName);
            return tasks;
        }

        [HttpPost("createGoal/{teamName}")]
        public  Goal CreateGoal(Goal goal, string teamName)
        {
            _teamService.CreateGoal(goal, teamName);
            return goal;
        }

        [HttpPost("createTask/{teamName}/{goalName}")]
        public Models.Task CreateTask(Models.Task task, string teamName, string goalName)
        {
             _teamService.CreateTask(task, teamName, goalName);
            return task;
        }
        
        [HttpPost("joinTeam/{teamName}/{username}")]
        public ActionResult JoinTeam(string teamName, string username)
        {
            _teamService.JoinTeam(teamName, username);
            return Ok();
        }
        
        [HttpPost("assignTask/{teamName}/{goalName}/{taskName}/{username}")]
        public ActionResult AssignUserToTask(string teamName, string goalName, string taskName, string username)
        {
            var serviceMessage = _teamService.AssignUserToTask(teamName, goalName, taskName, username);

            if (serviceMessage == "success")
            {
                return Ok();
            }

            return NotFound(serviceMessage);
        }

        [HttpPost("unassignTask/{teamName}/{goalName}/{taskName}/{username}")]
        public ActionResult UnassignUserToTask(string teamName, string goalName, string taskName, string username)
        {
            var serviceMessage = _teamService.unassignUserToTask(teamName, goalName, taskName, username);

            if (serviceMessage == "success")
            {
                return Ok();
            }

            return NotFound(serviceMessage);
        }

        
        /*
         * Update task and goal status
         */
        
        
        /*
         * Approving tasks
         */
        
        
        
    }
}