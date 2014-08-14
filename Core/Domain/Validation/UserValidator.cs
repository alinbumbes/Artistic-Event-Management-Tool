using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;

namespace Core.Domain.Validation
{
    public class UserValidator: AbstractValidator<User> 
    {
        public UserValidator()
        {
          
            RuleFor(user => user.Password)
                .NotNull()
                .NotEmpty();

            RuleFor(user => user.UserName)
                .NotNull()
                .NotEmpty();

            
        }
       

    }
}
