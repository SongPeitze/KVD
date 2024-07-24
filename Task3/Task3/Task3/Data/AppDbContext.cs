using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using Task3.Models;

namespace Task3.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Item> Items { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Apply soft delete filter to all entities with Status property
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                if (entityType.ClrType.GetProperty("Status") != null)
                {
                    var parameter = Expression.Parameter(entityType.ClrType, "x");
                    var filter = Expression.Lambda(
                        Expression.Equal(
                            Expression.Property(parameter, "Status"),
                            Expression.Constant('A')
                        ),
                        parameter
                    );

                    modelBuilder.Entity(entityType.ClrType).HasQueryFilter(filter);
                }
            }
        }

        public override int SaveChanges()
        {
            var entries = ChangeTracker.Entries();
            foreach (var entry in entries)
            {
                var entity = entry.Entity;

                if (entry.State == EntityState.Deleted && entity is ISoftDelete)
                {
                    entry.State = EntityState.Modified;
                    entity.GetType().
                        GetProperty("Status").SetValue(entity, 'D');
                }
            }
            return base.SaveChanges();
        }
    }
}
