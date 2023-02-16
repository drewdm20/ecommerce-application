using Microsoft.AspNetCore.Mvc;

namespace WebApplication2.Controllers;

// API controller for the User
[ApiController]
[Route("api/[controller]")]

public class UsersController: ControllerBase
{
    // Logger
    private readonly ILogger<UsersController> _logger;
    // Host environment to provide information pertaining to the current environment
    private readonly IHostEnvironment _hostEnvironment;
    // Constructor
    public UsersController(ILogger<UsersController> logger, IHostEnvironment hostEnvironment)
    {
        _logger = logger;
        _hostEnvironment = hostEnvironment;
        
    }
    // GET method to get all the existing users in the text file
    [HttpGet]
    [Route("GetUsers")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetUsers()
    {
        try
        {
            // Get the file path
            string filePath = Path.Combine(_hostEnvironment.ContentRootPath, "App_Data/Users.txt");
            // Read lines from text file and return response
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
    // POST method to authenticate whether a user exists in the text file or not
    [HttpPost]
    [Route("Login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Login(Login login)
    {
        // Creating new object of the Login model
        var user = new Login()
        {
            username = login.username,
            password = login.password,
            admin = login.admin
        };
        // Validating if the body is not null or empty 
        if (user == null)
        {
            return BadRequest();
        }
        try
        {
            // Get the file path
            string filePath = Path.Combine(_hostEnvironment.ContentRootPath, "App_Data/Users.txt");
            // List to store valid users
            List<string> validUsers = new List<string>();
            // List to store valid admins
            List<string> validAdmin = new List<string>();
            // Array containing all the lines in the file
            string[] lines = System.IO.File.ReadAllLines(filePath);
            if (lines.Length != 0)
            {
                // Iterate each line in the array
                foreach (var line in lines)
                {
                    // Create a new array of each word contained in the line by splitting the string at the dilimeter
                    string[] words = line.Split(',',StringSplitOptions.RemoveEmptyEntries);
                    // If there is words in the array
                    if (words.Length != 0)
                    {
                        // Get each element to authenticate the user
                        var username = words[3];
                        var password = words[4];
                        var admin = words[5];
                        // If the username, password and admin status from the request is the same as in the text file 
                        if (user.username.Equals(username) && user.password.Equals(password) && user.admin.Equals(admin))
                        {
                            // Switch case to see whether user is admin or not. If admin append to valid admins array else valid users array
                            switch (user.admin)
                            {
                                case "true":
                                    validAdmin.Add(user.username);
                                    break;
                                case "false":
                                    validUsers.Add(user.username);
                                    break;
                            }
                        }
                    }
                }
            }
            // Check to see if the admin list is not empty. If not return successful response for admin
            if (validAdmin?.Count > 0)
            {
                return Ok("Welcome Admin");
            }
            // Check to see if the user list is not empty. If not return successful response for user
            if (validUsers?.Count > 0)
            {
                _logger.LogInformation(user.username);
                return Ok("Welcome");
            }
            // Else the user is not valid so return unauthorized response
            else
            {
                return StatusCode(StatusCodes.Status401Unauthorized, "Invalid username and/or password.");   
            }
        }
        catch (IOException e)
        {
            Console.WriteLine(e + "The file could not be read");
            throw;
        }
    }
    // POST method to add a new user
    [HttpPost]
    [Route("AddUser")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddUser(User user)
    {
        // Default admin status
        string admin = "false";
        // Unique userId
        Random rd = new Random();
        // New object of the User model
        var newUser = new User()
        {
            userId = rd.Next(1000),
            fullName = user.fullName,
            email = user.email,
            username = user.username,
            password = user.password,
        };
        // Validate to check if request body is null
        if (newUser == null)
        {
            return BadRequest();
        }
        try
        {
            // Get file path
            string filePath = Path.Combine(_hostEnvironment.ContentRootPath, "App_Data/Users.txt");
            // List to store existing users
            List<string> existingUsers = new List<string>();
            // Read lines in file
            using (StreamReader sr = new StreamReader(filePath))
            {
                string lines = sr.ReadToEnd();
                if (lines.Length != 0)
                {
                    // Iterate through each word on a line seperated by a dilimeter
                    foreach (var word in lines.Split(','))
                    {
                        // Check to see if the username is already taken and append to existing users list
                        if (user.username.Equals(word))
                        {
                            existingUsers.Add(user.username);
                        }
                    }
                }
            }
            // If the user already exists return a bad request and a response to say username is already taken
            if (existingUsers?.Count > 0)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "Username already taken.");
            }
            // If the array is empty concatenate the user details and append it to the Users text file. Return a successful response.
            string content = newUser.userId + "," + newUser.fullName + "," + newUser.email + "," + newUser.username + "," + newUser.password + "," + admin;
            await System.IO.File.AppendAllTextAsync(filePath, content + Environment.NewLine);
            return StatusCode(StatusCodes.Status201Created, "User successfully registered");
        }
        catch (IOException e)
        {
            Console.WriteLine(e + "An error occured!");
            throw;
        }
    }
}