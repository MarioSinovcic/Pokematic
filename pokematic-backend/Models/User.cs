using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using pokematic_backend.JsonConverters;

namespace pokematic_backend.Models
{
    public class User
    {
        [JsonConverter(typeof(ObjectIdJsonConverter))]
        public ObjectId Id { get; set; }
        [BsonElement("username")] public string Username { get; set; }
        
        [BsonElement("role")] public string Role { get; set; }
        
    }
}