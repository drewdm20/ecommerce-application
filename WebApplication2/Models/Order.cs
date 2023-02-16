using System.ComponentModel.DataAnnotations;

namespace WebApplication2;

/// <summary>
/// Class <c>Items</c> a model schema that contains attributes related to each order item such as its description, price, quantity and subTotal 
/// </summary>
public class Items
{
    public string description { get; set; }
    public int price { get; set; }
    public int quantity { get; set; }
    public int subTotal { get; set; }
    
}
/// <summary>
/// Class <c>Order</c> a model schema that contains attributes of an order such as orderId, user, orderItems and the total amount of the order
/// </summary>
public class Order
{
    public int orderId { get; set; }
    public string user { get; set; }
    public List<Items> orderItems { get; set; }
    public int amount { get; set; }
}