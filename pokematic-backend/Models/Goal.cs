using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace pokematic_backend.Models
{
    public class Goal
    {
        [BsonElement("name")] public string Name { get; set; }
        
        [BsonElement("tasks")] public List<Task> Tasks = new List<Task>(); 
        
        [BsonElement("number")] public int Number { get; set; }
        
        [BsonElement("description")] public string Description { get; set; }

        [BsonElement("experiencePoints")] public int ExperiencePoints { get; set; }

        [BsonElement("progress")] public double Progress { get; set; }


    }
}