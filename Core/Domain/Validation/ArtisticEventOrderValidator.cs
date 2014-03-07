using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using FluentValidation.Results;

namespace Core.Domain.Validation
{
    public class ArtisticEventOrderValidator : AbstractValidator<ArtisticEventOrder>
    {
        public ArtisticEventOrderValidator()
        {
            RuleFor(x => x.EventDate).NotNull();

            RuleFor(artisticEvent => artisticEvent.EventType)
               .NotNull();

            RuleFor(artisticEvent => artisticEvent.EventLocation)
                .NotNull()
                .NotEmpty();

            //RuleFor(artisticEvent => artisticEvent.Requester)
            //  .NotNull();

            RuleFor(artisticEvent => artisticEvent.Price)
              .NotNull()
              .GreaterThan(0);

            

            Custom(BeGreatherThanEventMinimumDurationInHours);
            
        }

        private ValidationFailure BeGreatherThanEventMinimumDurationInHours(ArtisticEventOrder artisticEventOrder)
        {
            if (artisticEventOrder.DurationInHours < artisticEventOrder.EventType.MinimumDurationInHours)
            {
                return new ValidationFailure("Artistic event order","Must have duration greather than minimum event type duration");
            }

            return null;
        }


    }
}
