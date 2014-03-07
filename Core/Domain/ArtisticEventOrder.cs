using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NHibernate.Linq;

namespace Core.Domain
{
    public class ArtisticEventOrder
    {
        public virtual long Id { get; set; }
        public virtual bool WasPerformed { get; set; }
        public virtual EventType EventType { get; set; }
        public virtual User Requester { get; set; }
        public virtual string EventDateString  { get; set; }
        private DateTime? _eventDate;
        public virtual DateTime? EventDate
        {
            get
            {
                if (!_eventDate.HasValue)
                {
                    _eventDate = DateTime.ParseExact(EventDateString, "mm/dd/yyyy",null);
                }
                return _eventDate.Value;
            }
            set
            {
                _eventDate = value;
            }
        }
        public virtual int EventStartHour { get; set; }
        public virtual int? EventEndHour { get; set; }
        public virtual string EventLocation { get; set; }
        public virtual ICollection<Song> SelectedPlaylistSongs { get; set; }
        
        private decimal _durationInHours;
        public virtual decimal DurationInHours
        {
            get
            {
                
                    if (EventEndHour == null)
                    {
                        _durationInHours = EventType.MinimumDurationInHours;
                    }
                    else
                    {
                        _durationInHours = EventEndHour.Value - EventStartHour;
                        if (_durationInHours <= 0)
                        {
                            _durationInHours += 24;
                        }
                    }
                
                return _durationInHours;
                
            }
            set
            {
                _durationInHours = value;
            }
        }

        private decimal _price;
        public virtual decimal Price
        {
            get
            {
                _price = DurationInHours*EventType.PricePerHour;
                return _price;
            }
            set
            {
                _price = value;
            }
        }

        private double _minutesCovered;
        public virtual double MinutesCovered
        {
            get
            {
                _minutesCovered = 0;
                if (SelectedPlaylistSongs != null)
                {
                    SelectedPlaylistSongs.ForEach(s=>_minutesCovered+=s.DurationMin);
                }

                return _minutesCovered;
            }
            set
            {
                _minutesCovered = value;
            }
        }

        public ArtisticEventOrder()
        {
            SelectedPlaylistSongs = new List<Song>();
        }

    }

}
