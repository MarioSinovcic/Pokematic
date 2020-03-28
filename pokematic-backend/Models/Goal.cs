using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace pokematic_backend.Models
{
    public class Goal
    {
        public ObjectId Id { get; set; }
        
        [BsonElement("description")] public string Description { get; set; }
    }
}