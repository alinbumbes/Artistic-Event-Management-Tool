/// <reference path="../_refferences.js" />

//attach namespace
var Admin = Admin || {};

//View models should end in ViewModel
Admin.MusicGenresViewModel = function () {
    //make vm closure accesible everywhere within this scope
    var self = this;

    //observables
    self.observable = ko.observable();
    

    //computed

    //methods
};

//initializer
(function() {
    //apply bindings
    var vm = new Admin.MusicGenresViewModel();
    ko.applyBindings(vm);
   
})();

