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
        public virtual long? Id { get; set; }
        public virtual EventType Type { get; set; }
        public virtual User Requester { get; set; }
        public virtual DateTime Date { get; set; }
        public virtual decimal? DurationInHours { get; set; }
        public virtual string EventLocation { get; set; }
        public virtual decimal? Price { get; set; } 
    }
    
}
