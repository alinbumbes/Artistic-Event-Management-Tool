using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Domain
{
    public class EventType
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public decimal PricePerHour { get; set; }

        public EventType()
        {
            
        }

        public EventType(string name, decimal pricePerHour)
        {
            Name = name;
            PricePerHour = pricePerHour;
        }
    }
}
