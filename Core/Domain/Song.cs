using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Domain
{
    public class Song
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Band { get; set; }
        public TimeSpan Duration { get; set; }
        public MusicGenre MusicGenre { get; set; }

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
