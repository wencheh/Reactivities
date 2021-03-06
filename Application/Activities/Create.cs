using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        // We are not expecting to return sth from this command
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // We need to populate the properties of our activity from the received request
                var activity = new Activity
                {
                    Id = request.Id,
                    Title = request.Title,
                    Description = request.Description,
                    Category = request.Category,
                    Date = request.Date,
                    City = request.City,
                    Venue = request.Venue
                };

                // Add activity to our context
                _context.Activities.Add(activity);

                // Will return Task<int> which int is the number of changes saved into our database 
                // If changes > 0 then will consider this successful
                var success = await _context.SaveChangesAsync() > 0;

                // Unit.Value is just an Empty object, but it means that we are returning to our Api controller telling that requests are successful
                // Then our controller will return a 200 OK response
                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}