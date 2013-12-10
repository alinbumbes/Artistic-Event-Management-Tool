/// <reference path="../_refferences.js" />

//attach namespace
var Admin = Admin || {};

//View models should end in ViewModel
Admin.SongsViewModel = function() {
    //make vm closure accesible everywhere within this scope
    var self = this;

    //observables
    self.songs = ko.observable();
    self.musicGenres = ko.observable();
    
    //computed

    //methods
};

//initializer
(function() {
    //apply bindings
    var vm = new Admin.SongsViewModel();

    var requestData = {
        entityTypesComaSeparated: "Song,MusicGenre"
    };
    var promise = server.getDataWithoutStringify(appConfig.getAllEntitiesOfTypesUrl, requestData)
    .done(function (response) {
        vm.songs(response[0]);
        vm.musicGenres(response[1]);
        ko.applyBindings(vm);

    })
    .fail(function () {
    });


    
   
})();

