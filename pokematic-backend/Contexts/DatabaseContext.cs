using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace pokematic_backend.Contexts
{
    public class DatabaseContext
    {
        public IMongoDatabase Database { get; set; }
        
        public DatabaseContext(IConfiguration configuration)
        {
            var client = new MongoClient(configuration.GetConnectionString("CosmosDb"));
            Database = client.GetDatabase(configuration.GetConnectionString("PokematicDb"));
        }
    }
}

