using System.Collections.Generic;
using System.Linq;
using NHibernate;


namespace Data.QuerySystem
{
    public static class QuerySystem
    {
        public static IQueryable<dynamic> Query(this ISession session, string entityName, string whereClause = null, object[] whereParams = null, string selectClause = null, string orderByClause = null, int? takeClause = null, int? skipClause = null)
        {
            var entitiesQuery = session.InvokeQuery(entityName);

            return FilterIQueryable(entitiesQuery, whereClause, whereParams, selectClause, orderByClause, takeClause,skipClause);
        }

        public static IQueryable<object> FilterIQueryable(this IQueryable<object> queryableCollection, string whereClause = null, object[] whereParams = null, string selectClause = null, string orderByClause = null, int? takeClause = null, int? skipClause = null)
        {

            //Examples
            //whereClause = "(otherInfo==@0 or id==@1) and otherInfo==@2"; and
            //whereParams={"word",5,"other word"}

            //orderByClause="Name" or 
            //orderByClause="Name desc"

            //selectClause = "Name"; or
            //selectClause =  "New(CompanyName as Name, Phone)";
            
            if (!string.IsNullOrEmpty(whereClause))
            {
                queryableCollection = queryableCollection.Where(whereClause, whereParams);
            }

            if (!string.IsNullOrEmpty(orderByClause))
            {
                queryableCollection = queryableCollection.OrderBy(orderByClause);
            }

            if (!string.IsNullOrEmpty(selectClause))
            {
                queryableCollection = (IQueryable<object>)queryableCollection.Select(selectClause);
            }

            if ((takeClause.HasValue)&&(takeClause.Value>0))
            {
                queryableCollection = (IQueryable<object>)queryableCollection.Take(takeClause.Value);
            }

            if (skipClause.HasValue)
            {
                queryableCollection = (IQueryable<object>)queryableCollection.Skip(skipClause.Value);
            }

            return queryableCollection;
        }

        

    }
}
