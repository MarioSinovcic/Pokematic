using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using pokematic_backend.JsonConverters;

namespace pokematic_backend.Models
{
    public class Team
    {
        [JsonConverter(typeof(ObjectIdJsonConverter))]
        public ObjectId Id { get; set; }
        [BsonElement("name")] public string Name { get; set; }
        
        [BsonElement("image")] public string ImageUri { get; set; }
        
        [BsonElement("users")] public List<string> Users = new List<string>();

        [BsonElement("goals")] public List<Goal> Goals = new List<Goal>();

        [BsonElement("level")] public int Level { get; set; }
        
        [BsonElement("experiencePoints")] public int ExperiencePoints { get; set; }

        [BsonElement("pokemon")] public List<string> Pokemon = new List<string>(); 
        
    }
}