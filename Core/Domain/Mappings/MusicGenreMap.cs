﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentNHibernate.Mapping;

namespace Core.Domain.Mappings
{
    public class MusicGenreMap : ClassMap<MusicGenre>
    {
        public MusicGenreMap()
        {
            Id(x => x.Id).GeneratedBy.Increment();
            Map(x => x.Name).Not.Nullable();
            HasMany(x => x.Children);

            References(x => x.Parent);
        }
    }
}
