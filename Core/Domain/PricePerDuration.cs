using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Domain
{
    public class PricePerDuration
    {
        public long Id { get; set; }
        public decimal Price { get; set; }
        public TimeSpan Duration { get; set; }
    }
}
