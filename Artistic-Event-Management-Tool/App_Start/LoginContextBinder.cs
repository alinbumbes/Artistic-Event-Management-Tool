using System;
using System.Web.Mvc;
using Core.Domain;
using Core.Infrastructure;

namespace Web.App_Start
{
    public class LoginContextBinder : IModelBinder
    {
        public object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
        {
            // Some modelbinders can update properties on existing model instances. This
            // one doesn't need to - it's only used to supply action method parameters.
            if (bindingContext.Model != null)
                throw new InvalidOperationException("Cannot update instances");

            var context = new LoginContext();

            if (controllerContext.HttpContext.Session != null)
            {
                context = (LoginContext)controllerContext.HttpContext.Session[Constants.UserContextKey];

                if (context == null)
                {
                    context = new LoginContext();

                    controllerContext.HttpContext.Session[Constants.UserContextKey] = context;
                }
            }
            return context;
        }
    }
}