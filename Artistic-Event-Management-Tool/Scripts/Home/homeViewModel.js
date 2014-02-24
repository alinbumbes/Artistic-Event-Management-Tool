/// <reference path="../_refferences.js" />

//attach namespace
var Home = Home || {};

//View models should end in ViewModel
Home.HomeViewModel = function() {
    //make vm closure accesible everywhere within this scope
    var self = this;

    //observables
    self.eventTypes = ko.observable();
    self.artisticEventOrder = new common.ArtisticEventOrder();

    //computed

    //methods
};

//initializer
(function() {
    //apply bindings
    var vm = new Home.HomeViewModel();
    ko.applyBindings(ko.validatedObservable(vm));
    

    server.getDataWithoutStringify(appConfig.adminGetAllEntitiesOfTypesUrl,
   {
       entityTypesComaSeparated: "EventType",
       orderByClausesComaSeparated: "Name"
   })
   .done(function (response) {
       vm.eventTypes(response[0]);
   })
   .fail(function (message) {

       var errorText = AppConstants.FAILED_MESSAGE;
       if (message) {
           errorText += message;
       }

       toastr.error(errorText);
   });

})();