using System.Threading.Tasks;
using MongoDB.Bson;
using pokematic_backend.Models;

namespace pokematic_backend.Interfaces
{
    public interface ITeamService
    {
        public Task<Team> Get(string name);

        public void Create(Team team);

        public void Update(ObjectId id, Team teamToUpdate);

        public void Remove(string name);
    }
}