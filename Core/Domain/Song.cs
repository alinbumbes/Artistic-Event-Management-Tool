using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Domain
{
    public class Song 
    {
        public virtual long? Id { get; set; }
        public virtual string Name { get; set; }
        public virtual string Author { get; set; }
        public virtual double? DurationMin { get; set; }
        public virtual MusicGenre MusicGenre { get; set; }

        public Song()
        {}

        public Song(string name, string author)
        {
            Name = name;
            Author = author;
        }

        public Song(string name, string author, double durationMin, MusicGenre musicGenre)
        {
            Name = name;
            Author = author;
            DurationMin = durationMin;
            MusicGenre = musicGenre;
        }
    }
}
