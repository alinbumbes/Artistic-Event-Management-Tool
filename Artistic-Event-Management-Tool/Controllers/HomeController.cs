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
        public HomeController(ISession session, ValidatorFactory validatorFactory)
            : base(session, validatorFactory)
        { }

        public ActionResult LoginPage(LoginContext loginContext)
        {
            ViewBag.UserName = loginContext.UserName;
            ViewBag.LoginSuccessfull = loginContext.LoginSuccessfull;
            return View();
        }

        public ActionResult RegisterPage(LoginContext loginContext)
        {
            ViewBag.UserName = loginContext.UserName;
            ViewBag.UsernameAlreadyExists = loginContext.UsernameAlreadyExists;
            return View();
        }

        [HttpPost]
        public ActionResult Register(string userName, string contact, string password, LoginContext loginContext)
        {

            var existingUser = Session.Query<User>().SingleOrDefault(x => x.UserName == userName);
            if (existingUser != null)
            {
                loginContext.UsernameAlreadyExists = true;
                return RedirectToAction("RegisterPage");
            }
            
            var newUser = new User();
            newUser.UserName = userName;
            newUser.Contact = contact;
            newUser.Password = Cryptography.GetHash(password);

            using (var tx = Session.BeginTransaction())
            {
                Session.Save(newUser);
                tx.Commit();
            }

            loginContext.UserName = newUser.UserName;
            loginContext.IsAdmin = newUser.IsAdmin;
            loginContext.LoginSuccessfull = true;
            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult Login(string userName, string password, LoginContext loginContext)
        {
            var user = Session.Query<User>().SingleOrDefault(x => x.UserName == userName);
            if (user != null)
            {
                if(Cryptography.Verify(password,user.Password))
                {
                    loginContext.UserName = user.UserName;
                    loginContext.IsAdmin = user.IsAdmin;
                    loginContext.LoginSuccessfull = true;
                    return RedirectToAction("Index");
                }
            }

            loginContext.LoginSuccessfull = false;
            return RedirectToAction("LoginPage");
            
        }


        public ActionResult LogOut()
        {
           
            ((Controller)this).Session.Remove(Constants.UserContextKey);            

            return RedirectToAction("LoginPage");
        }

        public ActionResult Index(LoginContext loginContext)
        {
            ViewBag.UserName = loginContext.UserName;
            ViewBag.IsAdmin = loginContext.IsAdmin;
            ViewBag.LoginSuccessfull = loginContext.LoginSuccessfull;
            return View();
        }

        public ActionResult About(LoginContext loginContext)
        {
            ViewBag.UserName = loginContext.UserName;
            ViewBag.IsAdmin = loginContext.IsAdmin;
            ViewBag.LoginSuccessfull = loginContext.LoginSuccessfull;
            return View();
        }

        [HttpPost]
        public JsonResult OrderEvent(string eventOrderDataStringified, LoginContext loginContext)
        {
           var objSaved =  base.SaveOrOpdate("ArtisticEventOrder", eventOrderDataStringified);

           if (objSaved == null)
            {
                return Json(false);
                
            }
            else
           {
               var artEventOrder = (ArtisticEventOrder)objSaved;
               artEventOrder.Requester
                   = Session.Query<User>().SingleOrDefault(x => x.UserName == loginContext.UserName);

               using (var tx = Session.BeginTransaction())
               {
                   Session.SaveOrUpdate(artEventOrder);
                   tx.Commit();
               }

               return Json(true);
            }
            
        }

    }
}
