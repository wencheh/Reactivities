using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        // Need to know the Id of the activity we want to delete
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                // Handler logic
                // Get the activity
                var activity = await _context.Activities.FindAsync(request.Id);

                if (activity == null)
                    throw new Exception("Could not find activity");

                _context.Remove(activity);

                var success = await _context.SaveChangesAsync() > 0;

                // Empty object, but it means that we are returning to our Api controller telling that requests are successful
                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}