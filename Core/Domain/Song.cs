using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Domain
{
    public class Song
    {
        public virtual long Id { get; set; }
        public virtual string Name { get; set; }
        public virtual string Band { get; set; }
        public virtual TimeSpan Duration { get; set; }
        public virtual MusicGenre MusicGenre { get; set; }

        public Song()
        {}

        public Song(string name, string band)
        {
            Name = name;
            Band = band;
        }

        public Song(string name, string band, TimeSpan duration, MusicGenre musicGenre)
        {
            Name = name;
            Band = band;
            Duration = duration;
            MusicGenre = musicGenre;
        }
    }
}
