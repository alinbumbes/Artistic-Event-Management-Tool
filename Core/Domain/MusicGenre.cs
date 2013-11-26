using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Domain
{
    public class MusicGenre
    {
        public virtual long Id { get; set; }
        public virtual string Name { get; set; }
        
        private ICollection<MusicGenre> _children;
        public virtual ICollection<MusicGenre> Children 
        {
            get { return _children ?? (_children = new List<MusicGenre>()); }
            set { _children = value; }
        }

        public MusicGenre()
        {
            
        }
        
        public MusicGenre(string name, List<MusicGenre> children=null)
        {
            Name = name;
            Children = children;
        }
    }
}
