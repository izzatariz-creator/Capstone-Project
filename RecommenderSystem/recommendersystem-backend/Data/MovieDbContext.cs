using Microsoft.EntityFrameworkCore;
using recommendersystem_backend.Models;
using System;

namespace recommendersystem_backend.Data
{
    public class MovieDbContext : DbContext
    {
        public MovieDbContext(DbContextOptions<MovieDbContext> options) : base(options)
        {

        }

        // Models
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=(localdb)\\Local;Initial Catalog=MovieDb;Integrated Security=True");
        }
    }
}
