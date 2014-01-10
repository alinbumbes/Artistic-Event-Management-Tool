using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Extensions
{
    public static class ListExtensions
    {
        public static IList<TBase> ToListOfType<TDerived, TBase>(this IList<TDerived> inputList)
                where TDerived : TBase
        {
            var outputList = new List<TBase>();

            foreach (var obj in inputList)
            {
                outputList.Add(obj);
            }

            return outputList;
        } 
    }
}
