using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Win32;

namespace Core.Domain
{
    public class ArtisticEvent
    {
        public long Id { get; set; }
        public EventType Type { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan Duration { get; set; }
        public Location Location { get; set; }
        public User Requester { get; set; }
        public decimal Price { get; set; } 
    }
    
}
