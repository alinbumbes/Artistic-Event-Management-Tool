﻿using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Domain
{
    public class MusicGenre
    {
        public virtual long? Id { get; set; }
        public virtual string Name { get; set; }
        public virtual string Description { get; set; }
       
    }
}
