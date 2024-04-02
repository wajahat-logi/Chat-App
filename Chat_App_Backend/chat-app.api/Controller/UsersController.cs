using chat_app.api.Hubs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StockApp.Trade.Core.Persistance.Context;

namespace chat_app.api.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly IChatHub _chat;
        private readonly IApplicationDBContext _db;
        public UsersController(IChatHub chat, IApplicationDBContext db) {
            _chat = chat;
            _db = db;
        }
        [HttpGet("GetGroupList/{user}")]

        public IActionResult GetGroupList(string user)
        {
            
            //var result =  _chat.GetGroupList(user);
            var result = _db.connections.Where(x => x.UserId == user).ToList();
            return Ok(result);
        }
    }
}
