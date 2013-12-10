using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Core;
using NHibernate;
using NHibernate.Linq;

namespace Data.QuerySystem
{
    public static class NHibernateLinqReflections
    {
        private static object _locker = new object();

        private static MethodInfo _queryExtMeth;
        private static MethodInfo QueryExtMeth
        {
            get
            {
                if (_queryExtMeth == null)
                {
                    lock (_locker)
                    {
                        if (_queryExtMeth == null)
                        {
                            var linqExt = typeof(LinqExtensionMethods);
                            Type[] parameters = { typeof(ISession) };
                            _queryExtMeth = linqExt.GetMethod("Query", parameters);
                        }
                    }

                }

                return _queryExtMeth;
            }
        }

        public static IQueryable<object> InvokeQuery(this ISession session, string type)
        {
            var entityType = AllClasses.NameTypeMap[type];
            MethodInfo genericQuery = QueryExtMeth.MakeGenericMethod(entityType);
            object[] parameters = { session };

            return (IQueryable<object>)genericQuery.Invoke(null, parameters);
        }
    }
}