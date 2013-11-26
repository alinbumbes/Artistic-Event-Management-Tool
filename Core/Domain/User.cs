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
        public virtual UserType Type { get; set; }
        public virtual string Name { get; set; }
        public virtual string Email { get; set; }
        public virtual string Password { get; set; }

    }

    public enum UserType
    {
        User,
        Admin
    }
}
