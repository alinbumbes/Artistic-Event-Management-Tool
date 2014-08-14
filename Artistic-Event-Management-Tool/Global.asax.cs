using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Core.Infrastructure;
using Web.App_Start;

namespace Web
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            Database.Configure();

            ModelBinders.Binders.Add(typeof(LoginContext), new LoginContextBinder());
            
        }
    }
}