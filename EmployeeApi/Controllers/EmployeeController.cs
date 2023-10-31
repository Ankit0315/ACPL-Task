using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class EmployeeController : ControllerBase
{
    private readonly AppDbContext _context;

    public EmployeeController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/Employee
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
    {
        return await _context.Employees.ToListAsync();
    }

    // POST: api/Employee
    [HttpPost]
    public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
    {
        Console.WriteLine($"Received candidate: Name - {employee}"); 
        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetEmployees), new { id = employee.Id }, employee);
    }
}
