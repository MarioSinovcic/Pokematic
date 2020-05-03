using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using pokematic_backend.Models;
using pokematic_backend.Services;
using Task = System.Threading.Tasks.Task;

// TO DO
/*
 *users to switch roles,
 * check for existing team (when trying to search for teams to be added into), login stuff,
 */

// DONE
/*
 * Get all teams, create team, get goals, get tasks, create goals,
 * create tasks, get user, create user, join a team, updating task, updating goal (or progress of that goal)
 * updating task, updating goal (or progress of that goal),approving tasks (PMs), get all pokemon of that team’s collection,
 * adding a pokemon to team when they get a new pokemon, 
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
        
        
        /*
         * Team Endpoints
         */

        [HttpGet]
        public List<Team> GetAllTeams()
        {
            return _teamService.GetAllTeams();
        }
        
        [HttpPost("createTeam")]
        public Team CreateTeam(Team team)
        {
            _teamService.Create(team);
            return team;
        }

        [HttpGet("{teamName}")]
        public Team GetTeam(string teamName)
        {
            var team = _teamService.GetTeam(teamName);
            return team;
        }
        
        [HttpPost("joinTeam/{teamName}/{username}")]
        public ActionResult JoinTeam(string teamName, string username)
        {
            _teamService.JoinTeam(teamName, username);
            return Ok();
        }

        [HttpPut("updateTeam/{teamToUpdateName}")]
        public ActionResult UpdateTeam(string teamToUpdateName, Team updatedTeam)
        {
            var serviceMessage = _teamService.UpdateTeam(teamToUpdateName, updatedTeam);

            if (serviceMessage == "success")
            {
                return Ok(updatedTeam);
            }

            return NotFound(serviceMessage);
        }

        [HttpDelete("deleteTeam/{teamName}")]
        public ActionResult DeleteTeam(string teamName)
        {
            var serviceMessage = _teamService.DeleteTeam(teamName);

            if (serviceMessage == "success")
            {
                return Ok();
            }

            return NotFound(serviceMessage);
        }

        /**
         * Goal endpoints
         */

        [HttpGet("goals/{teamName}")]
        public List<Goal> GetGoals(string teamName)
        {
            var goals = _teamService.GetAllGoals(teamName);
            return goals;
        }
        
        [HttpGet("goals/{teamName}/{goalName}")]
        public Goal GetAGoal(string teamName, string goalName)
        {
            var goal = _teamService.GetGoal(teamName, goalName);
            return goal;
        }
        
        [HttpPost("createGoal/{teamName}")]
        public  Goal CreateGoal(Goal goal, string teamName)
        {
            _teamService.CreateGoal(goal, teamName);
            return goal;
        }
        
        [HttpDelete("deleteGoal/{teamName}/{goalName}")]
        public ActionResult DeleteGoal(string teamName, string goalName)
        {
            var serviceMessage = _teamService.DeleteGoal(teamName, goalName);

            if (serviceMessage == "success")
            {
                return Ok();
            }

            return NotFound(serviceMessage);
        }

        [HttpPut("updateGoal/{teamName}/{goalToUpdateName}")]
        public ActionResult UpdateGoal(string teamName, string goalToUpdateName, Goal updatedGoal)
        {
            var serviceMessage = _teamService.UpdateGoal(teamName, goalToUpdateName, updatedGoal);

            if (serviceMessage == "success")
            {
                return Ok(updatedGoal);
            }

            return NotFound(serviceMessage);
        }


        /**
         * Task endpoints
         */

        [HttpGet("tasks/{teamName}")]
        public List<Models.Task> GetTasks(string teamName)
        {
            var tasks = _teamService.GetTasks(teamName);
            return tasks;
        }

    
        [HttpPost("createTask/{teamName}/{goalName}")]
        public Models.Task CreateTask(Models.Task task, string teamName, string goalName)
        {
             _teamService.CreateTask(task, teamName, goalName);
            return task;
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

        [HttpDelete("deleteTask/{teamName}/{goalName}/{taskName}")]
        public ActionResult DeleteTask(string teamName, string goalName, string taskName)
        {
            var serviceMessage = _teamService.DeleteTask(teamName, goalName, taskName);

            if (serviceMessage == "success")
            {
                return Ok();
            }

            return NotFound(serviceMessage);
        }

        [HttpPut("updateTask/{teamName}/{goalName}/{taskToUpdateName}")]
        public ActionResult UpdateTask(string teamName, string goalName, string taskToUpdateName, Models.Task updatedTask)
        {
            var serviceMessage = _teamService.UpdateTask(teamName, goalName, taskToUpdateName, updatedTask);

            if (serviceMessage == "success")
            {
                return Ok();
            }

            return NotFound(serviceMessage);
        }
        
        
    }
}