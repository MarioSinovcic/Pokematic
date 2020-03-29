using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace pokematic_backend.Models
{
    public class Task
    { 
        public ObjectId Id { get; set; }

        [BsonElement("description")] public string Description { get; set; }
        
        [BsonElement("deadline")] public DateTime Deadline { get; set; }
        
        
    }
}