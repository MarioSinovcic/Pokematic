using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace pokematic_backend.Models
{
    public class Team
    {
        public ObjectId Id { get; set; }

        [BsonElement("name")] public string Name { get; set; }
        
        [BsonElement("users")] public List<User> Users { get; set; }

        [BsonElement("goals")] public List<Goal> Goals { get; set; }
        
        [BsonElement("level")] public int Level { get; set; }
        
        [BsonElement("experiencePoints")] public int ExperiencePoints { get; set; }

        [BsonElement("pokemon")] public List<Pokemon> Pokemons { get; set; }
        
    }
}