namespace chat_app.api.Entities
{
    public class UserConnection
    {
        public string Name { get; set; }
        public DateTime JoinedAt { get; set; }
    }


    public class Payload
    {
        public string Receiver { get; set; }
        public string Sender { get; set; }
        public string Message { get; set; }
        public DateTime JoinedAt { get; set; }
    }
}
