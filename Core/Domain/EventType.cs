﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Domain
{
    public class EventType 
    {
        public virtual long Id { get; set; }
        public virtual string Name { get; set; }
        public virtual decimal PricePerHour { get; set; }
        public virtual int MinimumDurationInHours { get; set; }
        
    }
}
