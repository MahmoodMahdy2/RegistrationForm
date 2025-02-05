using AutoMapper;
using RegistrationForm.Dtos;
using RegistrationForm.Models;

namespace RegistrationForm.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Student, StudentDto>();
            CreateMap<StudentDto, Student>();
        }
    }
}
