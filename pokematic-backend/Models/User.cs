using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace pokematic_backend.Models
{
    public class User
    {
        public ObjectId Id { get; set; }
        [BsonElement("username")] public string Username { get; set; }
        
        [BsonElement("role")] public string Role { get; set; }

        [BsonElement("teams")] public Team[] Teams { get; set; }
    }
}