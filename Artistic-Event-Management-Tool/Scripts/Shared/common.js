﻿var common = {};

common.User = function () {
    var self = this;
    //observables
    self.Id = ko.observable();
    self.UserName = ko.observable().extend({ required: true });
};

common.Song = function () {
    var self = this;
    //observables
    self.Id = ko.observable();
    self.Name = ko.observable().extend({ required: true });
    self.Author = ko.observable();
    self.DurationMin = ko.observable().extend({
        required: true,
        min: 0
    });
    
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

    };

};

common.ArtisticEventOrder = function () {
    var self = this;
    //observables
    self.Id = ko.observable();
    self.EventType = ko.observable().extend({ required: true });
    self.EventDate = ko.observable().extend({ required: true });
    self.EventDateString = ko.observable().extend({ required: true });
    self.EventStartHour = ko.observable().extend({ required: true });
    self.EventEndHour = ko.observable().extend({ required: true });
    self.EventLocation = ko.observable().extend({ required: true });
    
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
            var selectedDifference = self.EventEndHour().Value - self.EventStartHour().Value;
            if (selectedDifference <= 0) {
                selectedDifference += 24;
            }

            if (selectedDifference < self.EventType().MinimumDurationInHours) {
                toastr.error("Durata evenimentului " + self.EventType().Name + " trebuie sa fie de minim " + self.EventType().MinimumDurationInHours + " ore");
                
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
        self.EventType(model.EventType || null);
        self.EventDate(model.EventDate || null);
        self.EventDateString(model.EventDateString || null);
        self.EventStartHour(model.EventStartHour || null);
        self.EventEndHour(model.EventEndHour || null);
        self.EventLocation(model.EventLocation || null);
        self.SelectedPlaylistSongs(model.SelectedPlaylistSongs || null);
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


    self.isValidCustom = function () {
        if (!self.EventType()) {
            return false;
        }

        if (self.ComputedDuration() < self.EventType().MinimumDurationInHours) {
            return false;
        }
        
        if (!self.EventDate()) {
            return false;
        }
        
        if (!self.EventStartHour()) {
            return false;
        }
        
        if (!self.EventEndHour()) {
            return false;
        }
        
        if (!self.EventLocation()) {
            return false;
        }

        return true;
    };

};