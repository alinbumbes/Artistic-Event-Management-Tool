/// <reference path="../_refferences.js" />

//attach namespace
var Home = Home || {};

//View models should end in ViewModel
Home.LoginViewModel = function () {
    //make vm closure accesible everywhere within this scope
    var self = this;
    
    //observables
    self.userName = ko.observable();
    self.password = ko.observable();


    //computed

    //methods
    self.canLogin = function () {
        if (self.userName() && self.userName().length > 0
            && self.password() && self.password().length > 0) {
            return true;
        } else {
            return false;
        }
         
    };
};

//initializer
(function() {
    //apply bindings
    var vm = new Home.LoginViewModel();
    ko.applyBindings(ko.validatedObservable(vm));
})();