using System.ComponentModel.DataAnnotations;

namespace RegistrationForm.Dtos
{
    public class StudentDto
    {
        [Length(3, 50, ErrorMessage = "Enter Mail between 3 to 50 Characters")]
        public string FullName { get; set; }
        
        [EmailAddress]
        public string Email { get; set; }

        [Length(10, 15, ErrorMessage = "Invalid Phone Number")]
        public string PhoneNumber { get; set; }

        [Range(18,99, ErrorMessage = "Invalid Age Number")]
        public int Age { get; set; }
    }
}
