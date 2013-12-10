using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;

namespace Core.Domain.Validation
{
    public class ValidatorFactory
    {
        private const string ValidatorNameToken = "Validator";
        private readonly Dictionary<Type, IValidator> _validationDictionary = new Dictionary<Type, IValidator>();
        public ValidatorFactory()
        {}

        public IValidator GetValidator<T>()
        {
            var type = typeof (T);

            if (!_validationDictionary.ContainsKey(type))
            {
                var validatorClassName = type.Name + ValidatorNameToken;
                if (AllClasses.NameTypeMap.ContainsKey(validatorClassName))
                {
                    _validationDictionary.Add(type, (IValidator)Activator.CreateInstance(AllClasses.NameTypeMap[validatorClassName]));
                }
                else
                {
                    _validationDictionary.Add(type, new DefaultValidator());
                }
            }

            return _validationDictionary[type];
           
        }
    }
}
