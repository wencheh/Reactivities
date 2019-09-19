using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // Any api controller needs a root and api attribute, and also needs to derive from mvc controller base class
    // This [controller] will be replaced with Activities in this scenario
    [Route("api/[controller]")]
    [ApiController] // Binding
    public class ActivitiesController : ControllerBase   // We are using React as our view, so we don't need the one with view support
    {
        private readonly IMediator _mediator;

        // We need to "inject" mediator into the controller
        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }
        
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List()
        {
            // Sending a message to our List handler (List Query in this case)
            // This is our api controller method for getting a list of activity
            // Keep our api controller extremely dumb and thin
            // Because we are injecting mediator in our class, we need to provide mediatR as a service
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Details(Guid id)
        {
            // Initialize the Details.Query class with the id by using curly braces
            // By this when we create the Query class, we will also have access to the id from the root parameter that we get when we hit this method
            return await _mediator.Send(new Details.Query { Id = id });
        }

        // Post used for create an entity/resource, and we have to pass in what we are receiving in the body of the request
        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await _mediator.Send(new Delete.Command { Id = id });
        }
    }
}