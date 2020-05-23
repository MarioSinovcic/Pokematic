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
    public class GoalService
    {
        private readonly IMongoCollection<Team> _teams;

        public GoalService(IConfiguration configuration)
        {
            var databaseContext = new DatabaseContext(configuration);
            _teams = databaseContext.Database.GetCollection<Team>("Teams");
        }

        private string UpdateTeam(string teamName, Team teamToUpdate)
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

        public List<Goal> GetAllGoals(string teamName)
        {
            var team =  _teams.AsQueryable().FirstOrDefault(team => team.Name == teamName);
            return team.Goals.ToList();
        }

        public Goal GetGoal(string teamName, string goalName)
        {
            var team =  _teams.AsQueryable().FirstOrDefault(team => team.Name == teamName);
            
            if (team != null)
            {
                var goal = team.Goals.FirstOrDefault(goal => goal.Name == goalName);
                return goal;
            }

            return null;
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
                goal.Number = 0;
                var goals = new List<Goal> {goal};
                team.Goals = goals;
                UpdateTeam(teamName, team);
            }
            else
            {
                var biggestGoalNumber = 0;

                foreach (var g in team.Goals)
                {
                    if (g.Number > biggestGoalNumber)
                    {
                        biggestGoalNumber = g.Number;
                    }
                }

                goal.Number = biggestGoalNumber + 1;
                team.Goals.Add(goal);
                UpdateTeam(teamName, team);
            }

            return goal;
        }

        
        public string DeleteGoal(string teamName, string goalName)
        {
            var team = _teams.AsQueryable().FirstOrDefault(team => team.Name == teamName);

            if (team == null)
            {
                return "No team with that team name";
            }

            var goal = team.Goals.FirstOrDefault(goal => goal.Name == goalName);

            if (goal == null)
            {
                return "No goal with that goal name exists for the " + teamName + " team ";
            }

            team.Goals.Remove(team.Goals.Single(goal => goal.Name == goalName));
            UpdateTeam(teamName, team);

            return "success";
        }

        public string UpdateGoal(string teamName, string goalToUpdateName, Goal updatedGoal)
        {
            var team = _teams.AsQueryable().FirstOrDefault(team => team.Name == teamName);

            if (team == null)
            {
                return "No team with that team name";
            }

            var goalToUpdate = team.Goals.FirstOrDefault(goal => goal.Name == goalToUpdateName);

            if (goalToUpdate == null)
            {
                return "Trying to update goal that doesn't exist";
            }

            team.Goals[team.Goals.FindIndex(goal => goal.Name == goalToUpdateName)] = updatedGoal;
            UpdateTeam(teamName, team);

            return "success";
        }
    }
}