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

        public new JsonResult GetAllOfManyTypes(string entityTypesComaSeparated)
        {
            var allEntitiesOfRequestedTypes = base.GetAllOfManyTypes(entityTypesComaSeparated);
            return Json(allEntitiesOfRequestedTypes, JsonRequestBehavior.AllowGet);
        }

        public new JsonResult GetFiltered(string type, string whereClause = null, string whereParamsCommaSeparated = null, string selectClause = null, string orderByClause = null, int? takeClause = null, int? skipClause = null)
        {
            var allEntitiesOfRequestedTypes = base.GetFiltered(type, whereClause, whereParamsCommaSeparated, selectClause, orderByClause, takeClause, skipClause);
            var totalCount = base.CountFiltered(type, whereClause, whereParamsCommaSeparated);
            return Json(new {
                queryResult = allEntitiesOfRequestedTypes,
                totalCount = totalCount
            }, JsonRequestBehavior.AllowGet);
        }

        
        public new JsonResult SaveOrOpdate(string type, string objectStringified, string whereClause = null, string whereParamsCommaSeparated = null, string selectClause = null, string orderByClause = null, int? takeClause = null, int? skipClause = null)
        {
            if (!base.SaveOrOpdate(type, objectStringified))
            {
                throw new Exception(string.Format("Save or update failed for type: {0} and object stringified:{1}", type, objectStringified));
            }
            
            var allEntitiesOfRequestedTypes = base.GetFiltered(type, whereClause, whereParamsCommaSeparated, selectClause, orderByClause, takeClause, skipClause);
            return Json(allEntitiesOfRequestedTypes, JsonRequestBehavior.AllowGet);
        }

        public new JsonResult Delete(string type, string objectId, string whereClause = null, string whereParamsCommaSeparated = null, string selectClause = null, string orderByClause = null, int? takeClause = null, int? skipClause = null)
        {
            if (!base.Delete(type, objectId))
            {
                throw new Exception(string.Format("Delete failed for type: {0} and objectId:{1}", type, objectId));
            }


            var allEntitiesOfRequestedTypes = base.GetFiltered(type, whereClause, whereParamsCommaSeparated, selectClause, orderByClause, takeClause, skipClause);
            return Json(allEntitiesOfRequestedTypes, JsonRequestBehavior.AllowGet);
        }

        


    }
}