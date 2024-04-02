using chat_app.api.Entities;
using Microsoft.EntityFrameworkCore;

namespace StockApp.Trade.Core.Persistance.Context
{
    public class ApplicationDBContext : DbContext, IApplicationDBContext
    {

        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
        }
        public DbSet<GroupConnection> connections { get; set; }

        public async Task<int> SaveChangesAsync()
        {
            return await base.SaveChangesAsync();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<GroupConnection>().HasKey(e => e.id);
        }
    }
}
