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
            var team = _teams.AsQueryable().FirstAsync(team => team.Name == teamName).Result;
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
            var team =  _teams.AsQueryable().FirstAsync(team => team.Name == teamName).Result;
            return team.Goals.ToList();
        }
        
        public List<Models.Task> GetTasks(string teamName)
        {
            var team = _teams.AsQueryable().FirstAsync(team => team.Name == teamName).Result;
            return team.Goals.SelectMany(goal => goal.Tasks).ToList();
        }

        public Goal CreateGoal(Goal goal, string teamName)
        {
            var team = _teams.AsQueryable().FirstAsync(team => team.Name == teamName).Result;
            
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
            var team = _teams.AsQueryable().FirstAsync(team => team.Name == teamName).Result;
            var goal = team.Goals.First(goal => goal.Name == goalName);

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
            var team = _teams.AsQueryable().FirstAsync(team => team.Name == teamName).Result;
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
    }
}