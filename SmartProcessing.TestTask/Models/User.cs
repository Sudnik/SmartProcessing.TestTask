using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SmartProcessing.TestTask.Models
{
    public class User
    {
        [Required]
        public int ID { get; set; }
        [Required]
        public string FirstName { get; set; }
        public string LastName { get; set; }

        [Range(0, 150)]
        public Nullable<int> Age { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}