/// <reference path="../_refferences.js" />

//attach namespace
var Login = Login || {};

//View models should end in ViewModel
Login.LoginViewModel = function () {
    //make vm closure accesible everywhere within this scope
    var self = this;
      

    //observables
    self.userName = ko.observable();
    self.password = ko.observable();
  
    //computed

    //methods
    self.login = function () {
        
        var postData = {
            userName: self.userName(),
            password: self.password()
        };

        server.postData(appConfig.loginUrl, postData)
            .done(function(x) {
                toastr.success(AppConstants.SUCCESSFULL_ORDER);
            })
            .fail(function(x) {
                toastr.error(AppConstants.FAILED_MESSAGE);
            });
    };
};

//initializer
(function() {
    //apply bindings
    var vm = new Login.LoginViewModel();
    ko.applyBindings(ko.validatedObservable(vm));
   
})();