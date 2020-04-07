using System.Collections.Generic;
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
        private readonly TeamService _teamService;

        public UserController(UserService userService, TeamService teamService)
        {
            _userService = userService;
            _teamService = teamService;
        }
        
        /*
         *  Get method Return all users
         */
        [HttpGet]
        public List<User> GetAllUsers()
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
        
        /**
         * Join team
         */
        
        
    }
}