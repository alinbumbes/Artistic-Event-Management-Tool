using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Domain
{
    public class Location
    {
        public long Id { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Address { get; set; }

    }
}
