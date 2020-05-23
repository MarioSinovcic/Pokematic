using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using pokematic_backend.Contexts;
using pokematic_backend.Models;
using static MongoDB.Driver.Builders<pokematic_backend.Models.Team>;

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

        public Team GetTeam(string teamName)
        {
            var team = _teams.AsQueryable().FirstOrDefault(team => team.Name == teamName);
            return team;
        }

        public void Create(Team team)
        {
            _teams.InsertOneAsync(team);
        }

        public string UpdateTeam(string teamName, Team teamToUpdate)
        {
            var filter = Filter.Eq(team => team.Name, teamName);
            try
            {
                _teams.ReplaceOneAsync(filter, teamToUpdate);
            }
            catch (Exception e)
            {
                return "Request failed, no team with that team name or team object invalid";
            }
            
            return "success";
        }
        
        public string DeleteTeam(string teamName)
        {
            var team = _teams.AsQueryable().FirstOrDefault(team => team.Name == teamName);
            var filter = Filter.Eq(team => team.Name, teamName);
            
            if (team == null)
            {
                return "No team with that team name";
            }
            else
            {
                _teams.DeleteOneAsync(filter);
                return "success";
            }
            
        }
    }
}