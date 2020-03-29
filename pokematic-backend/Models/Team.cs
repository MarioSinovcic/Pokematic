﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace pokematic_backend.Models
{
    public class Team
    {
        public ObjectId Id { get; set; }

        [BsonElement("users")] public User[] Users { get; set; }

        [BsonElement("goals")] public Goal[] Goals { get; set; }
        
        [BsonElement("level")] public int Level { get; set; }
        
        [BsonElement("experiencePoints")] public int ExperiencePoints { get; set; }
    }
}