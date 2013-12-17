using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentNHibernate.Mapping;

namespace Core.Domain.Mappings
{
    public class SongMap : ClassMap<Song>
    {
        public SongMap()
        {
            Id(x => x.Id).GeneratedBy.Increment();
            Map(x => x.Name).Not.Nullable();
            Map(x => x.Author);
            Map(x => x.DurationMin);

            References(x => x.MusicGenre);
        }
    }
}
