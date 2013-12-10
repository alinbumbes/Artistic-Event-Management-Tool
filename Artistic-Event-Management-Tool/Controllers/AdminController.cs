using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Core.Domain.Validation;
using NHibernate;

namespace Web.Controllers
{
    public class AdminController : BaseController
    {
        public AdminController(ISession session, ValidatorFactory validatorFactory)
            : base(session, validatorFactory)
        { }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult EventTypes()
        {
            return View();
        }

        public ActionResult MusicGenres()
        {
            return View();
        }

        public ActionResult Songs()
        {
            return View();
        }

        public JsonResult GetAll(string entityTypesComaSeparated)
        {
            var allEntitiesOfRequestedTypes = base.GetAll(entityTypesComaSeparated.Split(','));
            return Json(allEntitiesOfRequestedTypes, JsonRequestBehavior.AllowGet);
        }

    }
}