var common = {};

common.Song = function () {
    var self = this;
    //observables
    self.Id = ko.observable(null);
    self.Name = ko.observable(null).extend({ required: true });
    self.Author = ko.observable(null);
    self.DurationMin = ko.observable(null).extend({
        required: true,
        min: 0
    });
    self.MusicGenre = ko.observable(null).extend({ required: true });

    //computed

    //methods
    self.updateFromModel = function (model) {
        if (!model) {
            model = {};
        }

        self.Id(model.Id || null);
        self.Name(model.Name || null);
        self.Author(model.Author || null);
        self.DurationMin(model.DurationMin || null);
        self.MusicGenre(model.MusicGenre || null);

    };

};

common.ArtisticEventOrder = function () {
    var self = this;
    //observables
    self.Id = ko.observable(null);
    self.EventType = ko.observable(null).extend({ required: true });
    self.EventDate = ko.observable(null).extend({ required: true });
    self.EventStartHour = ko.observable(null).extend({ required: true });
    self.EventEndHour = ko.observable(null);
    self.EventLocation = ko.observable(null);
    
    self.SelectedPlaylistSongs = ko.observableArray();

    //computed
   
    self.ComputedDuration = ko.computed(function () {
        if (!self.EventType()) {
            return null;
        }
        
        if (!self.EventStartHour()) {
            return null;
        }

        if (!self.EventEndHour()) {
            return self.EventType().MinimumDurationInHours;
        } else {
            var selectedDifference = self.EventEndHour().value - self.EventStartHour().value;
            if (selectedDifference <= 0) {
                selectedDifference += 24;
            }

            if (selectedDifference < self.EventType().MinimumDurationInHours) {
                toastr.error("Durata evenimentului " + self.EventType().Name + " trebuie sa fie ded minim " + self.EventType().MinimumDurationInHours + " ore");
                selectedDifference = self.EventType().MinimumDurationInHours;
            }
            
            return selectedDifference;
        }
    });

    self.ComputedPrice = ko.computed(function () {
        if (!self.ComputedDuration()) {
            return null;
        }

        return self.ComputedDuration() * self.EventType().PricePerHour;
    });
    
    self.MinutesCovered = ko.computed(function () {

        var totalMinutes = 0;
        ko.utils.arrayForEach(self.SelectedPlaylistSongs(), function (song) {
            totalMinutes += song.DurationMin;
        });

        return totalMinutes.toFixed(2);
    });


    //methods
    self.updateFromModel = function (model) {
        if (!model) {
            model = {};
        }

        self.Id(model.Id || null);
        self.Name(model.EventType || null);

    };


    self.addToPlaylist = function (song) {
        self.SelectedPlaylistSongs.remove(function (s) {
            return s == song;
        });

        self.SelectedPlaylistSongs.push(song);
    };
    
    self.removeFromPlaylist = function (song) {
        self.SelectedPlaylistSongs.remove(function (s) {
            return s == song;
        });
        
    };
    

   

};