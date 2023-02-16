using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication2.Controllers;
// API controller for orders
[ApiController]
[Route("api/[controller]")]

public class OrderController: ControllerBase
{
    // Logger
    private readonly ILogger<UsersController> _logger;
    // Host environment to provide information pertaining to the current environment
    private readonly IHostEnvironment _hostEnvironment;
    // Constructor
    public OrderController(ILogger<UsersController> logger, IHostEnvironment hostEnvironment)
    {
        _logger = logger;
        _hostEnvironment = hostEnvironment;
    }
    
    // POST method to create a new order and save it to the Orders text file
    [HttpPost]
    [Route("AddOrder")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddOrder(Order order)
    {
        // Create unique orderId
        Random rd = new Random();
        // Get the current date
        DateTime today = DateTime.Today;
        // Create new object Order
        var newOrder = new Order()
        {
            orderId = rd.Next(10000),
            user = order.user,
            orderItems = order.orderItems,
            amount = order.amount
        };
        // Validate to ensure body is not null else return bad request
        if (newOrder == null)
        {
            return BadRequest();
        }
        // Serialize the order items
        var jsonObj = JsonSerializer.Serialize(newOrder.orderItems);
        char[] charsToTrim = { '[', ']', '\"'};
        // Clean the formatting
        string items = jsonObj.Trim(charsToTrim);
        try
        {
            // Get the file path
            string filePath = Path.Combine(_hostEnvironment.ContentRootPath, "App_Data/Orders.txt");
            // Concatenate string to be written to file
            string content = today.ToString("yy-MM-dd") + "," + newOrder.orderId + "," + newOrder.user + "," + items + "," + newOrder.amount;
            // Write string to file amd return successful response
            await System.IO.File.AppendAllTextAsync(filePath, content + Environment.NewLine);
            return StatusCode(StatusCodes.Status201Created, "Successfully created new order");
        }
        catch (IOException e)
        {
            Console.WriteLine(e + " A new order cannot be created");
            throw;
        }
    }

    // GET method to get all the orders from the text file
    [HttpGet]
    [Route("GetOrders")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetOrders()
    {
        try
        {
            // Get the file path
            string filePath = Path.Combine(_hostEnvironment.ContentRootPath, "App_Data/Orders.txt");
            // Read contents of file into string and return the response with the orders
            using (StreamReader sr = new StreamReader(filePath))
            {
                string content = await sr.ReadToEndAsync();
                return Ok(content);
            }
        }
        catch (IOException e)
        {
            Console.WriteLine(e + "File could not be read");
            throw;
        }
    }
}