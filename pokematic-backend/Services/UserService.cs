using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using pokematic_backend.Contexts;
using pokematic_backend.Models;

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

        public Task<User> Get(string username)
        {
            var userToGet = _users.AsQueryable().FirstAsync(user => user.Username == username);
            return userToGet;
        }
        
        public void Create(User user)
        {
            _users.InsertOneAsync(user);
        }
        
        public void Update(ObjectId id, User userToUpdate)
        {
            _users.ReplaceOneAsync(user => user.Id == id, userToUpdate);
        }

        public void Remove(string username)
        {
            _users.DeleteOneAsync(user => user.Username == username);
        }
        
    }
}