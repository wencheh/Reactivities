using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    // Derive from an entity framework class. DbContext represents a session with the database
    // Another usage is for entity framework migration
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        // Values is going to be use for the table name inside SQLite
        public DbSet<Value> Values { get; set; }

        // Override this method is going to allow us to configure the entities as our migration is being created
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Value>()
                .HasData(
                    new Value {Id = 1, Name = "Value 101"},
                    new Value {Id = 2, Name = "Value 102"},
                    new Value {Id = 3, Name = "Value 103"}
                );
        }
    }
}
