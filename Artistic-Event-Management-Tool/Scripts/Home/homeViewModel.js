/// <reference path="../_refferences.js" />

//attach namespace
var Home = Home || {};

//View models should end in ViewModel
Home.HomeViewModel = function() {
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
    var vm = new Home.HomeViewModel();
    ko.applyBindings(vm);
})();