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

  
    // PUT: api/Employee/1

            [HttpPut("{id}")]
            public async Task<IActionResult> PutEmployee(int id, Employee employee)
            {
                if (id != employee.Id)
                {
                    return BadRequest();
                }

                _context.Entry(employee).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!EmployeeExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                return NoContent();
            }

    // DELETE: api/Employee/1
    [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            Console.WriteLine($"Attempting to delete employee with ID: {id}");
            var employee  = await _context.Employees.FindAsync(id);
            if (employee  == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
        private bool EmployeeExists(int id)
        {
        return _context.Employees.Any(e => e.Id == id);
        }
}
