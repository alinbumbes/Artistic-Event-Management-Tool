using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentNHibernate.Mapping;

namespace Core.Domain.Mappings
{
    public class ArtisticEventMap : ClassMap<ArtisticEvent>
    {
        public ArtisticEventMap()
        {
            Id(x => x.Id).GeneratedBy.Increment();
            Map(x => x.Date);
            Map(x => x.DurationInHours);
            Map(x => x.EventLocation);
            Map(x => x.Price);

            References(x => x.Requester);
            References(x => x.Type);
        }
    }
}
