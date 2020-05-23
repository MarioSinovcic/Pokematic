using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using pokematic_backend.Contexts;
using pokematic_backend.Models;
using static MongoDB.Driver.Builders<pokematic_backend.Models.Team>;

namespace pokematic_backend.Services
{
    public class UserService
    {
        private readonly IMongoCollection<Team> _teams;

        public UserService(IConfiguration configuration)
        {
            var databaseContext = new DatabaseContext(configuration);
            _teams = databaseContext.Database.GetCollection<Team>("Teams");
        }

        private void UpdateTeam(string teamName, Team teamToUpdate)
        {
            var filter = Filter.Eq(team => team.Name, teamName);
            try
            {
                _teams.ReplaceOneAsync(filter, teamToUpdate);
            }
            catch (Exception)
            {
                // ignored
            }
        }

        public string JoinTeam(string teamName, string username)
        {
            var team = _teams.AsQueryable().FirstOrDefault(teamToFind => teamToFind.Name == teamName);

            if (team == null)
            {
                return "No team with that team name";
            }

            if (team.Users.Contains(username))
            {
                return "User already part of team";
            }

            team.Users.Add(username);
            UpdateTeam(teamName, team);
            return "success";
        }

        public (List<Team>, string) GetAllTeamsForUser(string username)
        {
            var teams = _teams.AsQueryable().Where(team => team.Users.Contains(username)).ToList();
            return (teams, "success");
        }
    }
}