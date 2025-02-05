using Microsoft.EntityFrameworkCore;
using RegistrationForm.Models;

namespace RegistrationForm.DAL
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Student> Students { get; set; }
    }
}
