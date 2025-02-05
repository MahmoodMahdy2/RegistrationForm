using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RegistrationForm.DAL;
using RegistrationForm.Dtos;
using RegistrationForm.Models;

namespace RegistrationForm.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public StudentController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("GetStudent")]
        public ActionResult GetStudentByNameEmail(string name)
        {
            if (name == null)
                return BadRequest("Invalid Inputs");

            var student = _context.Students
                .Where(s => s.FullName == name || s.Email == name)
                .ToList();
            if (student is null)
                return NotFound();

            var studentDto = _mapper.Map<List<StudentDto>>(student);
            return Ok(studentDto);
        }

        [HttpGet]
        [Route("GetAllStudents")]
        public ActionResult GetStudents()
        {
            var students = _context.Students.OrderByDescending(s => s.Id).ToList();
            var studentDto = _mapper.Map<List<StudentDto>>(students);
            return Ok(studentDto);
        }

        [HttpPost]
        [Route("AddNewStudent")]
        public IActionResult AddStudent([FromBody] StudentDto dto)
        {
            if (dto == null)
                return BadRequest(ModelState);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var student = _mapper.Map<Student>(dto);

            _context.Students.Add(student);
            _context.SaveChanges();

            return Ok("student is Added successfully!");
        }
    }
}
