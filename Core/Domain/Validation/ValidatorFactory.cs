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
        private readonly Dictionary<string, IValidator> _validationDictionary = new Dictionary<string, IValidator>();
        public ValidatorFactory()
        {}

        public IValidator GetValidator(string type)
        {
            if (!_validationDictionary.ContainsKey(type))
            {
                var validatorClassName = type + ValidatorNameToken;
                if (AllCoreClasses.NameTypeMap.ContainsKey(validatorClassName))
                {
                    _validationDictionary.Add(type, (IValidator)Activator.CreateInstance(AllCoreClasses.NameTypeMap[validatorClassName]));
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
