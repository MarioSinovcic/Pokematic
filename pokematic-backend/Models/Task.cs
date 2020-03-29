using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace pokematic_backend.Models
{
    public class Task
    { 
        public ObjectId Id { get; set; }

        [BsonElement("name")] public string Name { get; set; }
        
        [BsonElement("deadline")] public DateTime Deadline { get; set; }
        
        [BsonElement("experiencePoints")] public int ExperiencePoints { get; set; }
        
        [BsonElement("status")] public Status Status { get; set; }
    }
}