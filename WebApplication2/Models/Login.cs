namespace WebApplication2;
/// <summary>
/// Class <c> Login </c> models a validation schema containing attributes needed for a user to login
/// </summary>
public class Login
{
    public string username { get; set; }
    public string password { get; set; }

    public string admin { get; set; }
}