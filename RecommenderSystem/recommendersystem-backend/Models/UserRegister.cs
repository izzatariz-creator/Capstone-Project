using System.ComponentModel.DataAnnotations.Schema;

namespace recommendersystem_backend.Models
{
    public class UserRegister
    {
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}