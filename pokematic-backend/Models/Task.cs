using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace pokematic_backend.Models
{
    public class Task
    {
        [BsonElement("name")] public string Name { get; set; }

        [BsonElement("taskNumber")] public int Number { get; set; }

        [BsonElement("description")] public string Description { get; set; }

        [BsonElement("experiencePoints")] public int ExperiencePoints { get; set; }
        
        [BsonElement("status")] public string Status { get; set; }

        [BsonElement("storyPoints")] public int StoryPoints { get; set; }
        [BsonElement("assignees")] public List<User> Assignees { get; set; }

        [BsonElement("approved")] public bool Approved { get; set; }

    }
}    