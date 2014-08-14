using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Core;
using Core.Domain;
using Core.Domain.Validation;
using Core.Extensions;
using Data.QuerySystem;
using Microsoft.Ajax.Utilities;
using Newtonsoft.Json;
using NHibernate;
using Core.Infrastructure;


namespace Web.Controllers
{
    public class BaseController : Controller
    {
        protected readonly ISession Session;
        protected readonly ValidatorFactory ValidatorFactory;
        protected readonly LoginContext LoginContext;

        public BaseController(ISession session, ValidatorFactory validatorFactory, LoginContext loginContext)
        {
            this.Session = session;
            this.ValidatorFactory = validatorFactory;
            this.LoginContext = loginContext;
        }

        protected List<List<object>> GetAllOfManyTypes(string entityTypesComaSeparated, string orderByClausesComaSeparated)
        {
            var result = new List<List<object>>();

            var entityTypes = entityTypesComaSeparated.Split(',').ToList();
            var orderByClauses = orderByClausesComaSeparated.Split(',').ToList();

            for(int i=0;i<entityTypes.Count;i++)
            {
                var type = entityTypes[i];
                if (i < orderByClauses.Count
                    && !string.IsNullOrEmpty(orderByClauses[i]))
                {
                    result.Add(Session.Query(type, orderByClause: orderByClauses[i]).ToList());
                }
                else
                {
                    result.Add(Session.Query(type).ToList());
                }
               
            }

            return result;
        }

        protected List<object> GetFiltered(string type, string whereClause = null, string whereParamsCommaSeparated = null, string selectClause = null, string orderByClause = null, int? takeClause = null, int? skipClause = null)
        {
            object[] whereParams;
            if (!string.IsNullOrEmpty(whereParamsCommaSeparated)
                && !string.IsNullOrWhiteSpace(whereParamsCommaSeparated))
            {
                whereParams = whereParamsCommaSeparated.Split(',').ToList()
                    .ToListOfType<string,object>().ToArray();
            }
            else
            {
                whereParams = null;
            }

            var result = Session.Query(type, whereClause, whereParams, selectClause, orderByClause, takeClause, skipClause).ToList();
            return result;
        }

        protected int CountFiltered(string type, string whereClause = null, string whereParamsCommaSeparated = null)
        {
            object[] whereParams;
            if (!string.IsNullOrEmpty(whereParamsCommaSeparated)
                && !string.IsNullOrWhiteSpace(whereParamsCommaSeparated))
            {
                whereParams = whereParamsCommaSeparated.Split(',').ToList()
                    .ToListOfType<string, object>().ToArray();
            }
            else
            {
                whereParams = null;
            }

            var result = Session.Query(type, whereClause, whereParams).Count();
            return result;
        }

        protected bool SaveOrOpdate(string type, string objectStringified)
        {
            if (string.IsNullOrEmpty(type)
                || string.IsNullOrEmpty(objectStringified))
            {
                return false;
            }

            if (!AllCoreClasses.NameTypeMap.ContainsKey(type))
            {
                return false;
            }

            objectStringified = objectStringified.Replace("\"Id\":null,","\"Id\":0,");
            var objectSentFromClient = JsonConvert.DeserializeObject(objectStringified, AllCoreClasses.NameTypeMap[type]);
            if (objectSentFromClient == null)
            {
                return false;
            }


            var validatorForType =  ValidatorFactory.GetValidator(type);
            var validationResult = validatorForType.Validate(objectSentFromClient);
            if (!validationResult.IsValid)
            {
                return false;
            }

            using (var tx = Session.BeginTransaction())
            {
                Session.SaveOrUpdate(type, objectSentFromClient);
                tx.Commit();
            }
            return true;
            
        }

        protected bool Delete(string type, string idObject)
        {
            if (string.IsNullOrEmpty(type) || string.IsNullOrEmpty(idObject))
            {
                return false;
            }

            using (var tx = Session.BeginTransaction())
            {
                var objForDeletion = Session.Load(type, Int64.Parse(idObject));
                Session.Delete(objForDeletion);
                tx.Commit();
            }

            return true;
        }


        /// <summary>
        /// Each unhandled exception is caught and logged in this method.
        /// This way, there is no need for individual try-catch statements in controller actions
        /// </summary>
        /// <param name="filterContext">The exception context</param>
        protected override void OnException(ExceptionContext filterContext)
        {
            if (filterContext.ExceptionHandled)
            {
                return;
            }
            //if not ajax request, then redirect to error page. else throw error to be handled in client side code
            if (!filterContext.HttpContext.Request.IsAjaxRequest())
            {
                filterContext.ExceptionHandled = true;
                var result = new ViewResult {ViewName = "~/Views/Shared/_Error.cshtml"};
                result.ViewBag.ErrorMessage = filterContext.Exception.Message;
                filterContext.Result = result;
            }
            
        }

    }
}