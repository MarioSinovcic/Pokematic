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
            
        /**
         * Team functionality 
         */

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
        
        
        public void JoinTeam(string teamName, string username)
        {
            var team = _teams.AsQueryable().FirstOrDefault(team => team.Name == teamName);
            var user = _userService.Get(username);

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
                UpdateTeam(teamName, team);
            }
            else
            {
                team.Users.Add(user);
                UpdateTeam(teamName, team);
            }

        }


        /**
         * Goal functionality
         */
        
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
        
        /**
         * Task functionality 
         */
        
        public List<Models.Task> GetTasks(string teamName)
        {
            var team = _teams.AsQueryable().FirstOrDefault(team => team.Name == teamName);
            return team.Goals.SelectMany(goal => goal.Tasks).ToList();
        }
        

        
        
        public void CreateTask(Models.Task task, string teamName, string goalName)
        {
            var team = _teams.AsQueryable().FirstOrDefault(team => team.Name == teamName);

            if (team == null)
            {
                return;
            }
            
            var goal = team.Goals.FirstOrDefault(goal => goal.Name == goalName);

            if (goal == null)
            {
                return; 
            }

            if (goal.Tasks == null)
            {
                task.Number = 0;
                goal.Tasks = new List<Models.Task> {task};
                team.Goals[team.Goals.FindIndex(goal => goal.Name == goalName)] = goal;
                UpdateTeam(teamName, team);
            }
            else
            {
                var biggestTaskNumber = 0;

                foreach (var t in goal.Tasks)
                {
                    if (t.Number > biggestTaskNumber)
                    {
                        biggestTaskNumber = t.Number;
                    }
                }
                
                task.Number = biggestTaskNumber + 1;
                goal.Tasks.Add(task);
                goal.Progress = CalculateGoalProgress(goal);
                team.Goals[team.Goals.FindIndex(goal => goal.Name == goalName)] = goal;
                UpdateTeam(teamName, team);
            }
            
        }
        
        public string DeleteTask(string teamName, string goalName, string taskName)
        { 
            var team = _teams.AsQueryable().FirstOrDefault(team => team.Name == teamName);

        private double CalculateGoalProgress(Goal goal)
        {
            double numberOfTasks = goal.Tasks.Count;
            double numberOfApprovedTasks = goal.Tasks.Count(task => task.Approved == true);

            return numberOfApprovedTasks / numberOfTasks;
        }


      
        public string DeleteTask(string teamName, string goalName, string taskName)
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

            if (goal.Tasks == null)
            {
                return "No task with that task name exists for the goal with the name " + goalName;
            }
            
            var task = goal.Tasks.FirstOrDefault(task => task.Name == taskName);

            if (task == null)
            {
                return "No task with that task name exists for the goal with the name " + goalName;
            }

            goal.Tasks.Remove(goal.Tasks.Single(task => task.Name == taskName));
            goal.Progress = CalculateGoalProgress(goal);
            team.Goals[team.Goals.FindIndex(goal => goal.Name == goalName)] = goal;
            UpdateTeam(teamName, team);

            return "success";
        }
        
        
        
        public string UpdateTask(string teamName, string goalName, string taskToUpdateName, Models.Task updatedTask)
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

            if (goal.Tasks == null)
            {
                return "No task with that task name exists for the goal with the name " + goalName;
            }
            
            var taskToUpdate = goal.Tasks.FirstOrDefault(task => task.Name == taskToUpdateName);

            if (taskToUpdate == null)
            {
                return "No task with that task name exists for the goal with the name " + goalName;
            }
            
            goal.Tasks[goal.Tasks.FindIndex(task => task.Name == taskToUpdateName)] = updatedTask;
            goal.Progress = CalculateGoalProgress(goal);
            team.Goals[team.Goals.FindIndex(goal => goal.Name == goalName)] = goal;
            UpdateTeam(teamName, team);
            
            return "success";
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
                UpdateTeam(teamName, team);
            }
            else if (assignees.Exists(user => user.Username == username))
            {
                return "User is already assigned to this task";
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
                UpdateTeam(teamName, team);
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
            UpdateTeam(teamName, team);

            return "success";
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