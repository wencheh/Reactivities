using System;

namespace Domain
{
    public class Activity
    {
        // Using Guid allows us to create the id either on the server side or the client side code
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
    }
}