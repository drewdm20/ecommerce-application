namespace WebApplication2;
/// <summary>
/// Class <c>User</c> a model schema that contains attributes pertaining to a new user
/// </summary>
public class User
{
    public int userId { get; set; }
    public string fullName { get; set; }
    public string email { get; set; }
    public string username { get; set; }
    public string password { get; set; }
}