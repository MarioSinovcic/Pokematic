using System.Threading.Tasks;
using MongoDB.Bson;
using pokematic_backend.Models;

namespace pokematic_backend.Interfaces
{
    public interface IUserService
    {
        public Task<User> Get(string username);

        public void Create(User user);

        public void Update(ObjectId id, User userToUpdate);

        public void Remove(string username);

    }
}