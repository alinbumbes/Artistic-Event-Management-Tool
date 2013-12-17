using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Core
{
    public static class AllCoreClasses
    {
        private static readonly object Locker = new object();

        private static Dictionary<string, Type> _nameTypeMap;
        public static Dictionary<string, Type> NameTypeMap
        {
            get
            {
                if (_nameTypeMap == null)
                {
                    lock (Locker)
                    {
                        if (_nameTypeMap == null)
                        {
                            _nameTypeMap = new Dictionary<string, Type>();
                            foreach (var t in Assembly.GetExecutingAssembly().GetTypes())
                            {
                                _nameTypeMap.Add(t.Name, t);
                            }
                        }
                    }

                }

                return _nameTypeMap;
            }
        }
    }
}
