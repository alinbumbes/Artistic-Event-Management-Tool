using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Infrastructure
{
    public class LoginContext
    {
        public string UserName { get; set; }
        public bool IsAdmin { get; set; }
        public bool? LoginSuccessfull { get; set; }
        public bool? UsernameAlreadyExists { get; set; }
        
    }
  
}
