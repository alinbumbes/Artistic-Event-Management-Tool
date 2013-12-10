using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;

namespace Core.Domain.Validation
{
    public class ArtisticEventValidator : AbstractValidator<ArtisticEvent>
    {
        public ArtisticEventValidator()
        {
            RuleFor(artisticEvent => artisticEvent.Type)
                .NotNull();

            RuleFor(artisticEvent => artisticEvent.EventLocation)
                .NotNull()
                .NotEmpty();
            
        }
    }
}
