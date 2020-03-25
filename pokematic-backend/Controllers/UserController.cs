using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using pokematic_backend.Models;
using pokematic_backend.Services;

namespace pokematic_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }
        
        /*
         *  Get method Return all users
         */
        [HttpGet]
        public string GetAllUsers()
        {
            return _userService.GetAllUsers();
        }
        
        /*
         * 
         */
        [HttpPost("create")]
        public async Task<User> CreateUser(User user)
        {
            _userService.Create(user);
            return user;
        }

        [HttpGet("{username}")]
        public async Task<User> GetUser(string username)
        {
            var user = _userService.Get(username);
            return await user;
        }
        
        
        
    }
}