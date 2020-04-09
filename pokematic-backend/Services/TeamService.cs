using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using pokematic_backend.Contexts;
using pokematic_backend.Interfaces;
using pokematic_backend.Models;
using Task = System.Threading.Tasks.Task;

namespace pokematic_backend.Services
{
    public class TeamService
    {
        private readonly IMongoCollection<Team> _teams;
        
        public TeamService(IConfiguration configuration)
        {
            var databaseContext = new DatabaseContext(configuration);
            _teams = databaseContext.Database.GetCollection<Team>("Teams");
        }

        public List<Team> GetAllTeams()
        {
            return _teams.AsQueryable().ToList();
        }

        public Task<Team> Get(string teamName)
        {
            var team = _teams.AsQueryable().FirstAsync(team => team.Name == teamName);
            return team;
        }

        public void Create(Team team)
        {
            _teams.InsertOneAsync(team);
        }

        public void Update(string teamName, Team teamToUpdate)
        {
            _teams.ReplaceOneAsync(team => team.Name == teamName, teamToUpdate);
        }

        public void Remove(string name)
        {
            _teams.DeleteOneAsync(team => team.Name== name);
        }

        public List<Goal> GetGoals(string teamName)
        {
            var team =  _teams.AsQueryable().FirstAsync(team => team.Name == teamName);
            return team.Result.Goals.ToList();
        }
        
        public List<Models.Task> GetTasks(string teamName)
        {
            var team = _teams.AsQueryable().FirstAsync(team => team.Name == teamName).Result;
            return team.Goals.SelectMany(goal => goal.Tasks).ToList();
        }

        public Goal CreateGoal(Goal goal, string teamName)
        {
            var team = _teams.AsQueryable().FirstAsync(team => team.Name == teamName).Result;
            team.Goals.Append(goal);
            Update(teamName, team);
            return goal;
        }

        public void CreateTask(Models.Task task, string goalName, string teamName)
        {
            var team = _teams.AsQueryable().FirstAsync(team => team.Name == teamName).Result;
            var goal = team.Goals.First(goal => goal.Name == goalName);

            goal.Tasks.Append(task);
            team.Goals[team.Goals.ToList().FindIndex(goal => goal.Name == goalName)] = goal;
            Update(teamName, team);
        }
        
        
        public Team JoinTeam(string teamName, User user)
        {
            var team = _teams.AsQueryable().FirstAsync(team => team.Name == teamName).Result;
            team.Users.Append(user);
            Update(team.Name, team);
            return team;
        }
    }
}