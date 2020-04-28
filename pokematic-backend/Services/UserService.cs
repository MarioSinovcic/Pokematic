using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using pokematic_backend.Contexts;
using pokematic_backend.Models;
using static MongoDB.Driver.Builders<pokematic_backend.Models.User>;

namespace pokematic_backend.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;

        public UserService(IConfiguration configuration)
        {
            var databaseContext = new DatabaseContext(configuration);
            _users = databaseContext.Database.GetCollection<User>("Users");
        }

        public List<User> GetAllUsers()
        {
            return _users.AsQueryable().ToList();
        }

        public User Get(string username)
        {
            var user = _users.AsQueryable().FirstOrDefault(user => user.Username == username);
            return user;
        }
        
        public void Create(User user)
        {
            _users.InsertOneAsync(user);
        }
        
        public void Update(string username, User user)
        {
            var filter = Filter.Eq(user => user.Username, username);
            _users.ReplaceOneAsync(filter, user);
        }

        public void Remove(string username)
        {
            _users.DeleteOneAsync(user => user.Username == username);
        }
        
    }
}