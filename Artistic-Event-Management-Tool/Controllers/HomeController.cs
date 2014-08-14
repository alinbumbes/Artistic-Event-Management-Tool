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
using Core.Infrastructure;

namespace Web.Controllers
{
    public class HomeController : BaseController
    {
        public HomeController(ISession session, ValidatorFactory validatorFactory, LoginContext loginContext)
            : base(session, validatorFactory, loginContext)
        { }

        public ActionResult LoginPage()
        {
            ViewBag.LoginSuccessfull = LoginContext.LoginSuccessfull;
            return View();
        }

        public ActionResult RegisterPage()
        {
            ViewBag.UsernameAlreadyExists = LoginContext.UsernameAlreadyExists;
            return View();
        }

        [HttpPost]
        public ActionResult Register(string userName, string password)
        {

            var existingUser = Session.Query<User>().SingleOrDefault(x => x.UserName == userName);
            if (existingUser != null)
            {
                LoginContext.UsernameAlreadyExists = true;
                return RedirectToAction("RegisterPage");
            }
            
            var newUser = new User();
            newUser.UserName = userName;
            newUser.Password = Cryptography.GetHash(password);

            using (var tx = Session.BeginTransaction())
            {
                Session.Save(newUser);
                tx.Commit();
            }

            LoginContext.UserName = newUser.UserName;
            LoginContext.IsAdmin = newUser.IsAdmin;
            LoginContext.LoginSuccessfull = true;
            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult Login(string userName, string password)
        {
            var user = Session.Query<User>().SingleOrDefault(x => x.UserName == userName);
            if (user != null)
            {
                if(Cryptography.Verify(password,user.Password))
                {
                    LoginContext.UserName = user.UserName;
                    LoginContext.IsAdmin = user.IsAdmin;
                    LoginContext.LoginSuccessfull = true;
                    return RedirectToAction("Index");
                }
            }

            LoginContext.LoginSuccessfull = false;
            return RedirectToAction("LoginPage");
            
        }


        public ActionResult LogOut()
        {
            LoginContext.UserName = null;
            LoginContext.IsAdmin = false;
            LoginContext.LoginSuccessfull = null;
            
            return RedirectToAction("LoginPage");
        }
        
        public ActionResult Index()
        {
            ViewBag.UserName = LoginContext.UserName;
            ViewBag.IsAdmin = LoginContext.IsAdmin;
            ViewBag.LoginSuccessfull = LoginContext.LoginSuccessfull;
            return View();
        }

        public ActionResult About()
        {
            ViewBag.UserName = LoginContext.UserName;
            ViewBag.IsAdmin = LoginContext.IsAdmin;
            ViewBag.LoginSuccessfull = LoginContext.LoginSuccessfull;
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
