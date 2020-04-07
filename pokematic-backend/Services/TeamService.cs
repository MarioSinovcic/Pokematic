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
    public class TeamService : ITeamService
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

        public Task<Team> Get(string name)
        {
            var teamToGet = _teams.AsQueryable().FirstAsync(team => team.Name == name);
            return teamToGet;
        }

        public void Create(Team team)
        {
            _teams.InsertOneAsync(team);
        }

        public void Update(ObjectId id, Team teamToUpdate)
        {
            _teams.ReplaceOneAsync(team => team.Id == id, teamToUpdate);
        }

        public void Remove(string name)
        {
            _teams.DeleteOneAsync(team => team.Name== name);
        }

        public Goal[] GetGoals(string teamName)
        {
            return null;
        }
        
        public Task[] GetTasks(string teamName)
        {
            throw new System.NotImplementedException();
        }

        public void CreateGoal(Goal goal, string teamName)
        {
            throw new System.NotImplementedException();
        }

        public void CreateTask(Task task, string goalName, string teamName)
        {
            throw new System.NotImplementedException();
        }
        
        
        
        
        
        

 
    }
}