using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace pokematic_backend.Models
{
    public class Goal
    {
        public ObjectId Id { get; set; }

        [BsonElement("name")] public string Name { get; set; }
        
        [BsonElement("tasks")] public List<Task> Tasks { get; set; }

        [BsonElement("experiencePoints")] public int ExperiencePoints { get; set; }

        [BsonElement("progress")] public int Progress { get; set; }


    }
}