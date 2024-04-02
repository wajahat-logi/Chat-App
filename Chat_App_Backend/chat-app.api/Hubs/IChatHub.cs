using chat_app.api.Entities;

namespace chat_app.api.Hubs
{
    public interface IChatHub
    {
        IDictionary<string, GroupConnection> GetGroupList(string user);
    }
}
