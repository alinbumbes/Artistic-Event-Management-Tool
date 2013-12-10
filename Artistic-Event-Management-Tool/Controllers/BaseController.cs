using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Core.Domain.Validation;
using Data.QuerySystem;
using NHibernate;

namespace Web.Controllers
{
    public class BaseController : Controller
    {
        protected readonly ISession Session;
        protected readonly ValidatorFactory ValidatorFactory;

        public BaseController(ISession session, ValidatorFactory validatorFactory)
        {
            this.Session = session;
            this.ValidatorFactory = validatorFactory;
        }

        protected List<List<object>> GetAll(string[] entityTypes)
        {
            var result = new List<List<object>>();

            foreach (var type in entityTypes)
            {
                result.Add(Session.Query(type).ToList());
            }

            return result;
        }

    }
}