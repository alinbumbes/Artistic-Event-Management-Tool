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
using Data.QuerySystem;
using Newtonsoft.Json;
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

            //objectStringified = objectStringified.Replace("\"Id\":null,","\"Id\":-1,");
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
            
            try
            {
                using (var tx = Session.BeginTransaction())
                {
                    Session.SaveOrUpdate(type, objectSentFromClient);
                    tx.Commit();
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
            
        }

        protected bool Delete(string type, string idObject)
        {
            if (string.IsNullOrEmpty(type) || string.IsNullOrEmpty(idObject))
            {
                return false;
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