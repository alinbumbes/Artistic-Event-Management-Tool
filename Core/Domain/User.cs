using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Domain
{
    public class User
    {
        public virtual long Id { get; set; }
        public virtual bool IsAdmin { get; set; }
        public virtual string UserName { get; set; }
        public virtual string Password { get; set; }

    }
    
}
