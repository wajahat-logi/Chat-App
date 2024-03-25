using chat_app.api.Entities;
using Microsoft.AspNetCore.SignalR;
using chat_app.api.Utils;
using SignalRSwaggerGen.Attributes;

namespace chat_app.api.Hubs
{
    [SignalRHub]
    public class ChatHub : Hub
    {
        private readonly IDictionary<string, UserConnection> _userConnections;

        public ChatHub(IDictionary<string, UserConnection> userConnections)
        {
            _userConnections = userConnections;
        }

        public async Task SendMessage(string message)
        {
            if (_userConnections.TryGetValue(Context.ConnectionId, out var userConnection))
            {
                var sentAt = DateTime.Now.MakeDateFormat();

                await Clients.Caller.SendAsync("ReceiveMessage", new
                {
                    from = userConnection.Name,
                    text = message,
                    sentAt,
                    isIncoming = false
                });
                await Clients.AllExcept(Context.ConnectionId).SendAsync("ReceiveMessage", new
                {
                    from = userConnection.Name,
                    text = message,
                    sentAt,
                    isIncoming = true
                });
            }
        }

        public async Task JoinRoom(string userName)
        {
            var now = DateTime.Now;

            _userConnections[Context.ConnectionId] = new UserConnection
            {
                Name = userName,
                JoinedAt = now
            };

            await Clients.All.SendAsync("ReceiveMessage", new
            {
                from = "",
                text = $" \"{userName}\"",
                sentAt = now.MakeDateFormat(),
                isIncoming = true
            });

            await SendConnectedUsers();
        }

        public Task SendConnectedUsers()
        {
            return Clients.All.SendAsync("ReceiveConnectedUsers", _userConnections
                .Select(u => new
                {
                    name = u.Value.Name,
                    joinedAt = u.Value.JoinedAt.MakeDateFormat()
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
                    sentAt = DateTime.Now.MakeDateFormat(),
                    isIncoming = true
                });

                SendConnectedUsers();
            }
            return base.OnDisconnectedAsync(exception);
        }

    }
}
