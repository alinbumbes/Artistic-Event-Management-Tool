using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Core.Domain;
using Core.Domain.Validation;
using Newtonsoft.Json;
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

        [HttpPost]
        public JsonResult OrderEvent(string eventOrderDataStringified)
        {
           var saveSuccessfull =  base.SaveOrOpdate("ArtisticEventOrder", eventOrderDataStringified);

            if (saveSuccessfull)
            {
                return Json(true);
            }
            else
            {
                return Json(false);
            }
            
        }

    }
}
