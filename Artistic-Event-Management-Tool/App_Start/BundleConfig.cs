using System.Web;
using System.Web.Optimization;

namespace Artistic_Event_Management_Tool
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/dependencies").Include(
                        "~/Scripts/jquery-{version}.min.js",
                        "~/Scripts/knockout-{version}.min.js"));
            
            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));

           
        }
    }
}