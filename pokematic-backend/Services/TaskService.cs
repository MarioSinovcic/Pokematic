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
    public class TaskService
    {
        private readonly IMongoCollection<Team> _teams;
        public TaskService(IConfiguration configuration)
        {
            var databaseContext = new DatabaseContext(configuration);
            _teams = databaseContext.Database.GetCollection<Team>("Teams");
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
        
        public List<Task> GetTasks(string teamName)
        {
            var team = _teams.AsQueryable().FirstOrDefault(team => team.Name == teamName);
            return team.Goals.SelectMany(goal => goal.Tasks).ToList();
        }

        public void CreateTask(Task task, string teamName, string goalName)
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
                goal.ExperiencePoints += task.ExperiencePoints;
                team.Goals[team.Goals.FindIndex(goal => goal.Name == goalName)] = goal;
                UpdateTeam(teamName, team);
            }
            
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
            goal.ExperiencePoints -= task.ExperiencePoints;
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
            goal.ExperiencePoints -= taskToUpdate.ExperiencePoints; // Update goals experience points with updated task experience point
            goal.ExperiencePoints += updatedTask.ExperiencePoints;
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

            var user = team.Users.FirstOrDefault(user => user == username);

            if (user == null)
            {
                return "No user with that username in this team";
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
                task.Assignees.Add(username);
                goal.Tasks[goal.Tasks.FindIndex(task => task.Name == taskName)] = task;
                team.Goals[team.Goals.FindIndex(goal => goal.Name == goalName)] = goal;
                UpdateTeam(teamName, team);
            }
            else if (assignees.Exists(user => user == username))
            {
                return "User is already assigned to this task";
            }
            else if (assignees.Exists(user => user == username))
            {
                return "User is already assigned to this task";
            }
            else if (assignees.Exists(user => user == username))
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
            
            var user = team.Users.FirstOrDefault(user => user == username);

            if (user == null)
            {
                return "No user with that username in this team";
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

            if (!assignees.Exists(user => user == username))
            {
                return "User is not assigned to this task";
            }

            assignees.Remove(assignees.Single(user => user == username));
            task.Assignees = assignees;
            goal.Tasks[goal.Tasks.FindIndex(task => task.Name == taskName)] = task;
            team.Goals[team.Goals.FindIndex(goal => goal.Name == goalName)] = goal;
            UpdateTeam(teamName, team);

            return "success";
        }
        
        private double CalculateGoalProgress(Goal goal)
        {
            double numberOfTasks = goal.Tasks.Count;
            double numberOfApprovedTasks = goal.Tasks.Count(task => task.Approved == true);

            return numberOfApprovedTasks / numberOfTasks;
        }
    }
}