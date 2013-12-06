using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;

namespace Core.Domain.Validation
{
    public class SongValidator : AbstractValidator<Song> 
    {
        public SongValidator()
        {
            RuleFor(song => song.Name)
                .NotNull()
                .NotEmpty();
        }
    }
}
