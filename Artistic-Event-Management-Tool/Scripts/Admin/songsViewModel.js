/// <reference path="../_refferences.js" />

//attach namespace
var Admin = Admin || {};

Admin.Song = function () {
    var self = this;
    //observables
    self.Id = ko.observable(null);
    self.Name = ko.observable(null).extend({ required: true });
    self.Author = ko.observable(null).extend({ required: true });
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



//View models should end in ViewModel
Admin.SongsViewModel = function() {
    //make vm closure accesible everywhere within this scope
    var self = this;

    //observables
    self.songs = ko.observable();
    self.musicGenres = ko.observable();
    
    self.song = new Admin.Song();
    //computed

    //methods
    self.addNewSong = function () {
        self.song.updateFromModel();
        self.songEditPanelDialog.dialog("open");

    };

    self.editSong = function (selectedSong) {
        self.song.updateFromModel(selectedSong);
        self.songEditPanelDialog.dialog("open");
        
    };

    self.deleteSong = function (song) {
        var x = song;
    };

    self.sortBy = function(propertyName) {
        var s = 4;
    };

};

//initializer
(function() {
    //apply bindings
    var vm = new Admin.SongsViewModel();


    vm.songEditPanelDialog = $("#songEditPanel").dialog({
        width: 500,
        height:500,
        autoOpen: false,
        modal: true,
        open: function () {
            $(this)
                .parent()
                .find(".ui-dialog-titlebar-close")
                .hide();
        },
        buttons: [{
            text: "Save",
            click: function () {
                var requestSaveData = {
                    type: "Song",
                    objectStringified: JSON.stringify({
                        Id: vm.song.Id(),
                        Name: vm.song.Name(),
                        Author: vm.song.Author(),
                        DurationMin: vm.song.DurationMin(),
                        MusicGenre: vm.song.MusicGenre()
                    })
                };
                var promise = server.postData(appConfig.adminSaveOrOpdate, requestSaveData)
                .done(function (response) {
                    if (response === true) {
                        vm.songEditPanelDialog.dialog("close");
                        toastr.success(AppConstants.SAVE_SUCCESSFULL_MESSAGE);
                        $("#songsButton").click();
                    } else {
                        
                        var errorText = AppConstants.SAVE_FAILED_MESSAGE;
                        if (response) {
                            errorText += response;
                        }
                        toastr.error(errorText);
                    }
                })
            .fail(function () {
                toastr.error(AppConstants.SAVE_FAILED_MESSAGE);
            });

            }
        },
         {
             text: "Cancel",
             click: function () {
                 $(this).dialog("close");
             }
         }]
    });


    var requestData = {
        entityTypesComaSeparated: "Song,MusicGenre"
    };
    var promise = server.getDataWithoutStringify(appConfig.adminGetAllEntitiesOfTypesUrl, requestData)
    .done(function (response) {
        vm.songs(response[0]);
        
        vm.musicGenres(response[1]);
        vm.musicGenres().each(function (musicGenre) {
            if (musicGenre.Parent) {
                musicGenre.Name = musicGenre.Parent.Name + " (" + musicGenre.Name + ")";
            } else {
                musicGenre.Name = musicGenre.Name + " (Other)";
            }
        });

        vm.musicGenres(vm.musicGenres().sortBy(function (musicGenre) {
            return musicGenre.Name;
        }));


        ko.applyBindings(vm);
    })
    .fail(function (message) {

        var errorText = AppConstants.FAILED_MESSAGE;
        if (message) {
            errorText += message;
        }

        toastr.error(errorText);
    });
      
})();

