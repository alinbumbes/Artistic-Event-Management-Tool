using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Core.Domain;
using Core.Domain.Validation;
using NHibernate;
using NHibernate.Linq;

namespace Web.Controllers
{
    public class HomeController : BaseController
    {
        public HomeController(ISession session, ValidatorFactory validatorFactory)
            : base(session, validatorFactory)
        { }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            return View();
        }

    }
}
