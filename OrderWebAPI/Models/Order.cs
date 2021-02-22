using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OrderWebAPI.Models
{
    /// <summary>
    /// This class is Order Status
    /// </summary>
    public class Order
    {
        // Primary Key of Order
        [Key]
        public int OrderID { get; set; } 

        // Represent Product ID
        [Required]
        public int ProductID { get; set; }

        // Represent Product Name
        [Required]
        [StringLength(200)]
        public string ProductName { get; set; }

        // Order Date
        [Required]
        public string OrderDate { get; set; }

        [Required]
        public string OrderStatus { get; set; }
    }
}
