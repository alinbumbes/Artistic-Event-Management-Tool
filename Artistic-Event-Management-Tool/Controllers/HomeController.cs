using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Core.Domain;
using NHibernate;
using NHibernate.Linq;

namespace Artistic_Event_Management_Tool.Controllers
{
    public class HomeController : Controller
    {
        private readonly ISession _session;

        public HomeController(ISession session)
        {
            _session = session;
        }
        public ActionResult Index()
        {
            var musics = _session.Query<MusicGenre>().ToList();

            return View();
        }

        public ActionResult About()
        {
            return View();
        }

    }
}
