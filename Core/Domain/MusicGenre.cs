using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Domain
{
    public class MusicGenre
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public MusicGenre Parent { get; set; }

        public MusicGenre()
        {
            
        }

        public MusicGenre(string name)
        {
            Name = name;
        }

        public MusicGenre(string name, MusicGenre parent)
        {
            Name = name;
            Parent = parent;
        }
    }
}
