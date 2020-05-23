using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using pokematic_backend.Models;
using pokematic_backend.Services;


namespace pokematic_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeamController : ControllerBase
    {
        private readonly TeamService _teamService;
        private readonly UserService _userService;
        private readonly TaskService _taskService;
        private readonly GoalService _goalService;

        public TeamController(TeamService teamService, UserService userService, TaskService taskService, GoalService goalService)
        {
            _teamService = teamService;
            _userService = userService;
            _taskService = taskService;
            _goalService = goalService;
        }

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
         * Goals
         */
        [HttpGet("goals/{teamName}")]
        public List<Goal> GetGoals(string teamName)
        {
            var goals = _goalService.GetAllGoals(teamName);
            return goals;
        }
        
        [HttpGet("goals/{teamName}/{goalName}")]
        public Goal GetAGoal(string teamName, string goalName)
        {
            var goal = _goalService.GetGoal(teamName, goalName);
            return goal;
        }
        
        [HttpPost("createGoal/{teamName}")]
        public  Goal CreateGoal(Goal goal, string teamName)
        {
            _goalService.CreateGoal(goal, teamName);
            return goal;
        }
        
        [HttpDelete("deleteGoal/{teamName}/{goalName}")]
        public ActionResult DeleteGoal(string teamName, string goalName)
        {
            var serviceMessage = _goalService.DeleteGoal(teamName, goalName);

            if (serviceMessage == "success")
            {
                return Ok();
            }

            return NotFound(serviceMessage);
        }

        [HttpPut("updateGoal/{teamName}/{goalToUpdateName}")]
        public ActionResult UpdateGoal(string teamName, string goalToUpdateName, Goal updatedGoal)
        {
            var serviceMessage = _goalService.UpdateGoal(teamName, goalToUpdateName, updatedGoal);

            if (serviceMessage == "success")
            {
                return Ok(updatedGoal);
            }

            return NotFound(serviceMessage);
        }
        
        /**
         * Tasks
         */
        [HttpGet("tasks/{teamName}")]
        public List<Task> GetTasks(string teamName)
        {
            var tasks = _taskService.GetTasks(teamName);
            return tasks;
        }

    
        [HttpPost("createTask/{teamName}/{goalName}")]
        public Task CreateTask(Task task, string teamName, string goalName)
        {
            _taskService.CreateTask(task, teamName, goalName);
            return task;
        }
        
   
        
        [HttpPost("assignTask/{teamName}/{goalName}/{taskName}/{username}")]
        public ActionResult AssignUserToTask(string teamName, string goalName, string taskName, string username)
        {
            var serviceMessage = _taskService.AssignUserToTask(teamName, goalName, taskName, username);

            if (serviceMessage == "success")
            {
                return Ok();
            }

            return NotFound(serviceMessage);
        }

        [HttpPost("unassignTask/{teamName}/{goalName}/{taskName}/{username}")]
        public ActionResult UnassignUserToTask(string teamName, string goalName, string taskName, string username)
        {
            var serviceMessage = _taskService.UnassignUserToTask(teamName, goalName, taskName, username);

            if (serviceMessage == "success")
            {
                return Ok();
            }

            return NotFound(serviceMessage);
        }

        [HttpDelete("deleteTask/{teamName}/{goalName}/{taskName}")]
        public ActionResult DeleteTask(string teamName, string goalName, string taskName)
        {
            var serviceMessage = _taskService.DeleteTask(teamName, goalName, taskName);

            if (serviceMessage == "success")
            {
                return Ok();
            }

            return NotFound(serviceMessage);
        }

        [HttpPut("updateTask/{teamName}/{goalName}/{taskToUpdateName}")]
        public ActionResult UpdateTask(string teamName, string goalName, string taskToUpdateName, Task updatedTask)
        {
            var serviceMessage = _taskService.UpdateTask(teamName, goalName, taskToUpdateName, updatedTask);

            if (serviceMessage == "success")
            {
                return Ok();
            }

            return NotFound(serviceMessage);
        }
        
        /**
         * User
         */
        
        [HttpPost("joinTeam/{teamName}/{username}")]
        public ActionResult JoinTeam(string teamName, string username)
        {
            var serviceMessage = _userService.JoinTeam(teamName, username);
            
            if (serviceMessage == "success")
            {
                return Ok();
            }

            return NotFound(serviceMessage);
        }

        [HttpGet("teamsForUser/{username}")]
        public ActionResult GetAllTeamsForUser(string username)
        {
            var (teams, serviceMessage) = _userService.GetAllTeamsForUser(username);
            
            if (serviceMessage == "success")
            {
                return Ok(teams);
            }

            return NotFound(serviceMessage);
        }
    }
}