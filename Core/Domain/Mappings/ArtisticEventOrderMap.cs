using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentNHibernate.Mapping;

namespace Core.Domain.Mappings
{
    public class ArtisticEventOrderMap : ClassMap<ArtisticEventOrder>
    {
        public ArtisticEventOrderMap()
        {
            Id(x => x.Id).GeneratedBy.Increment();
            Map(x => x.EventDate);
            Map(x => x.EventDateString);
            Map(x => x.EventStartHour);
            Map(x => x.EventEndHour);
            Map(x => x.EventLocation);
            Map(x => x.DurationInHours);
            Map(x => x.Price);
            Map(x => x.WasPerformed);

            References(x => x.Requester);
            References(x => x.EventType);
            HasMany(x => x.SelectedPlaylistSongs);
        }
    }
}
