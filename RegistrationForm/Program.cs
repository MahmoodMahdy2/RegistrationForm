
using Microsoft.EntityFrameworkCore;
using RegistrationForm.DAL;
using AutoMapper;

namespace RegistrationForm
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            // Register CORS policy (this allows your React app to make requests to the API)
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("RegistrationForm",
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:3000")
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });
            builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            var connection = builder.Configuration.GetConnectionString("DefaultConnection");
            builder.Services.AddDbContext<ApplicationDbContext>(opts => opts.UseSqlServer(connection));

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            // Apply the CORS policy globally
            app.UseCors("RegistrationForm");

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
