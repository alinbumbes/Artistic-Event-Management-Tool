using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;

namespace Core.Domain.Validation
{
    public class EventTypeValidator : AbstractValidator<EventType> 
    {
        public EventTypeValidator()
        {
            RuleFor(eventType => eventType.Name)
                .NotNull()
                .NotEmpty();

            RuleFor(eventType => eventType.PricePerHour)
                .GreaterThan(0);

            RuleFor(eventType => eventType.MinimumDurationInHours)
                .GreaterThan(0);
        }
    }
}
