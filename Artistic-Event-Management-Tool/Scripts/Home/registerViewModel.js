/// <reference path="../_refferences.js" />

//attach namespace
var Home = Home || {};

//View models should end in ViewModel
Home.RegisterViewModel = function () {
    //make vm closure accesible everywhere within this scope
    var self = this;
    
    //observables
    self.userName = ko.observable();
    self.password = ko.observable();
    self.passwordConfirm = ko.observable();
    self.passwordsDoNotMatch = ko.observable(false);
    //computed

    //methods
    self.onBeforeSubmit = function () {
        if (self.password() != self.passwordConfirm()) {
            self.passwordsDoNotMatch(true);
            return false;
        } else {
            self.passwordsDoNotMatch(false);
            return true;
        } 
    };

    self.canRegister = function () {
        if (self.userName() && self.userName().length > 0
            && self.password() && self.password().length > 0
            && self.passwordConfirm() && self.passwordConfirm().length > 0) {
            return true;
        } else {
            return false;
        }
    };

};

//initializer
(function() {
    //apply bindings
    var vm = new Home.RegisterViewModel();
    ko.applyBindings(ko.validatedObservable(vm));
})();