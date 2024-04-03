using chat_app.api.Entities;
using Microsoft.AspNetCore.SignalR;
using chat_app.api.Utils;
using SignalRSwaggerGen.Attributes;
using Newtonsoft.Json;
using StockApp.Trade.Core.Persistance.Context;

namespace chat_app.api.Hubs
{
    [SignalRHub]
    public class ChatHub : Hub, IChatHub
    {
        private readonly IDictionary<string, UserConnection> _userConnections;
        private readonly IDictionary<string, GroupConnection> _groupConnections;
        private readonly IApplicationDBContext _db;

        public ChatHub(IDictionary<string, UserConnection> userConnections, IDictionary<string, GroupConnection> groupConnections, IApplicationDBContext db)
        {
            _userConnections = userConnections;
            _groupConnections = groupConnections;
            _db = db;
        }

        public async Task JoinRoom(string userName)
        {
            var now = DateTime.Now;
            _userConnections[Context.ConnectionId] = new UserConnection
            {
                Name = userName,
                JoinedAt = now
            };
            await SendConnectedUsers();
        }

        public IDictionary<string, GroupConnection> GetGroupList(string user)
        {
            return _groupConnections;
        }

        public async Task SendMessage(string jsonPayload)
        {
            try
            {
                if (_userConnections.TryGetValue(Context.ConnectionId, out var userConnection))
                {
                    dynamic payload = JsonConvert.DeserializeObject(jsonPayload);
                    string receiverName = payload.receiver.Value;

                    var receiverConnection = _userConnections.FirstOrDefault(kv => kv.Value.Name == receiverName);
                    if (receiverConnection.Value != null)
                    {
                        await Clients.Client(receiverConnection.Key).SendAsync("ReceiveMessage", new
                        {
                            Receiver = payload.receiver.Value,
                            Sender = payload.sender.Value,
                            Message = payload.message.Value,
                            JoinedAt =  ((DateTime)payload.joinedAt.Value).CurrentDate(),
                        });
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public async Task SendMessageGroup(string jsonPayload)
        {
            try
            {
                dynamic payload = JsonConvert.DeserializeObject(jsonPayload);
                string groupName = payload.receiver.Value;
                await Clients.Group(groupName).SendAsync("ReceiveMessageGroup", new
                {
                    Receiver = payload.receiver.Value,
                    Sender = payload.sender.Value,
                    Message = payload.message.Value,
                    JoinedAt = ((DateTime)payload.joinedAt.Value).CurrentDate(),
                }); ;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }


        public async Task AddToGroup(string groupName,string user)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            GroupConnection group = _db.connections.Where(x => x.Group == groupName && x.UserId == user).FirstOrDefault();
            
            if (group == null )
            {
                group = new GroupConnection
                {
                    UserId = user,
                    Group = groupName,
                };
                _db.connections.Add(group);
                await _db.SaveChangesAsync();
                await Clients.Client(Context.ConnectionId).SendAsync("GroupAdded", group);
            }
        }

        public Task SendConnectedUsers()
        {
            return Clients.All.SendAsync("ReceiveConnectedUsers", _userConnections
                .Select(u => new
                {
                    name = u.Value.Name,
                    joinedAt = u.Value.JoinedAt.CurrentDate()
                }).OrderByDescending(u => u.joinedAt));
        }
  
        public override Task OnDisconnectedAsync(Exception? exception)
        {
            if (_userConnections.TryGetValue(Context.ConnectionId, out var userConnection))
            {
                _userConnections.Remove(Context.ConnectionId);

                Clients.All.SendAsync("ReceiveMessage", new
                {
                    from = "",
                    text = $" \"{userConnection.Name}\"",
                    sentAt = DateTime.Now.CurrentDate(),
                    isIncoming = true
                });

                SendConnectedUsers();
            }
            return base.OnDisconnectedAsync(exception);
        }
    }
}
