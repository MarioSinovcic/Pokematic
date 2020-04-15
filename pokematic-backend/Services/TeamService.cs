using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using pokematic_backend.Contexts;
using pokematic_backend.Models;
using static MongoDB.Driver.Builders<pokematic_backend.Models.Team>;
using Task = System.Threading.Tasks.Task;

namespace pokematic_backend.Services
{
    public class TeamService
    {
        private readonly IMongoCollection<Team> _teams;
        private readonly UserService _userService;
        
        public TeamService(IConfiguration configuration)
        {
            var databaseContext = new DatabaseContext(configuration);
            _userService = new UserService(configuration);
            _teams = databaseContext.Database.GetCollection<Team>("Teams");
        }

        public List<Team> GetAllTeams()
        {
            return _teams.AsQueryable().ToList();
        }

        public Team Get(string teamName)
        {
            var team = _teams.AsQueryable().FirstOrDefault(team => team.Name == teamName);
            return team;
        }

        public void Create(Team team)
        {
            _teams.InsertOneAsync(team);
        }

        public void Update(string teamName, Team team)
        {
            var filter = Filter.Eq(team => team.Name, teamName);
            _teams.ReplaceOneAsync(filter, team);
        }

        public void Remove(string name)
        {
            _teams.DeleteOneAsync(team => team.Name== name);
        }

        public List<Goal> GetGoals(string teamName)
        {
            var team =  _teams.AsQueryable().FirstOrDefault(team => team.Name == teamName);
            return team.Goals.ToList();
        }
        
        public List<Models.Task> GetTasks(string teamName)
        {
            var team = _teams.AsQueryable().FirstOrDefault(team => team.Name == teamName);
            return team.Goals.SelectMany(goal => goal.Tasks).ToList();
        }

        public Goal CreateGoal(Goal goal, string teamName)
        {
            var team = _teams.AsQueryable().FirstOrDefault(team => team.Name == teamName);
            
            if (team == null)
            {
                return null;
            }

            if (team.Goals == null)
            {
                var goals = new List<Goal> {goal};
                team.Goals = goals;
                Update(teamName, team);
            }
            else
            {
                team.Goals.Add(goal);
                Update(teamName, team);
            }

            return goal;
        }

        public void CreateTask(Models.Task task, string teamName, string goalName)
        {
            var team = _teams.AsQueryable().FirstOrDefault(team => team.Name == teamName);
            var goal = team.Goals.FirstOrDefault(goal => goal.Name == goalName);

            if (goal == null)
            {
                return; 
            }

            if (goal.Tasks == null)
            {
                goal.Tasks = new List<Models.Task> {task};
                team.Goals[team.Goals.FindIndex(goal => goal.Name == goalName)] = goal;
                Update(teamName, team);
            }
            else
            {
                goal.Tasks.Add(task);
                team.Goals[team.Goals.FindIndex(goal => goal.Name == goalName)] = goal;
                Update(teamName, team);
            }
            
        }


        public void JoinTeam(string teamName, string username)
        {
            var team = _teams.AsQueryable().FirstOrDefault(team => team.Name == teamName);
            var user = _userService.Get(username);

            if (team == null)
            {
                return;
            }

            if (team.Users == null)
            {
                team.Users = new List<User> {user};
                Update(teamName, team);
            }
            else
            {
                team.Users.Add(user);
                Update(teamName, team);
            }

        }

        public string AssignUserToTask(string teamName, string goalName, string taskName, string username)
        {
            
            var team = _teams.AsQueryable().FirstOrDefault(team => team.Name == teamName);

            if (team == null)
            {
                return "No team with that team name";

            }
            
            var user = _userService.Get(username);

            if (user == null)
            {
                return "No user with that username";
            }
            
            var goal = team.Goals.FirstOrDefault(goal => goal.Name == goalName);

            if (goal == null)
            {
                return "No goal with that goal name exists for the " + teamName + " team ";
            }

            if (goal.Tasks == null)
            {
                return "No task with that task name exists for the goal with the name " + goalName;
            }
            
            var task = goal.Tasks.FirstOrDefault(task => task.Name == taskName);

            if (task == null)
            {
                return "No task with that task name exists for the goal with the name " + goalName;
            }

            var assignees = task.Assignees;

            if (assignees == null)
            {
                task.Assignees = new List<User> {user};
                goal.Tasks[goal.Tasks.FindIndex(task => task.Name == taskName)] = task;
                team.Goals[team.Goals.FindIndex(goal => goal.Name == goalName)] = goal;
                Update(teamName, team);
            }
            else if (assignees.Exists(user => user.Username == username))
            {
                return "User is already assigned to this task";
            }
            else
            {
                assignees.Add(user);
                task.Assignees = assignees;
                goal.Tasks[goal.Tasks.FindIndex(task => task.Name == taskName)] = task;
                team.Goals[team.Goals.FindIndex(goal => goal.Name == goalName)] = goal;
                Update(teamName, team);
            }

            return "success";

        }

        public string unassignUserToTask(string teamName, string goalName, string taskName, string username)
        {
                      
            var team = _teams.AsQueryable().FirstOrDefault(team => team.Name == teamName);

            if (team == null)
            {
                return "No team with that team name";

            }
            
            var user = _userService.Get(username);

            if (user == null)
            {
                return "No user with that username";
            }
            
            var goal = team.Goals.FirstOrDefault(goal => goal.Name == goalName);

            if (goal == null)
            {
                return "No goal with that goal name exists for the " + teamName + " team ";
            }

            var task = goal.Tasks.FirstOrDefault(task => task.Name == taskName);

            if (task == null)
            {
                return "No task with that task name exists for the goal with the name " + goalName;
            }
            
            var assignees = task.Assignees;

            if (assignees == null)
            {
                return "User is not assigned to this task";
            }

            if (!assignees.Exists(user => user.Username == username))
            {
                return "User is not assigned to this task";
            }

            assignees.Remove(assignees.Single(user => user.Username == username));
            task.Assignees = assignees;
            goal.Tasks[goal.Tasks.FindIndex(task => task.Name == taskName)] = task;
            team.Goals[team.Goals.FindIndex(goal => goal.Name == goalName)] = goal;
            Update(teamName, team);

            return "success";
        }
    }
}