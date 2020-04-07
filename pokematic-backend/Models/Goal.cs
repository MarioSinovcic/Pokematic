using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace pokematic_backend.Models
{
    public class Goal
    {
        public ObjectId Id { get; set; }

        [BsonElement("name")] public string Name { get; set; }
        
        [BsonElement("tasks")] public Task[] Tasks { get; set; }

        [BsonElement("experiencePoints")] public int ExperiencePoints { get; set; }
        
        // reward XP
        // progress - ratio of number of tasks which are complted vs how many to complete
        
        
    }
}