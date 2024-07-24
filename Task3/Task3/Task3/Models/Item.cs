using System.ComponentModel.DataAnnotations;

namespace Task3.Models
{
    public class Item : ISoftDelete
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public char Status { get; set; } = 'A'; // Soft delete flag, default is active
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
