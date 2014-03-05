/// <reference path="../_refferences.js" />

//attach namespace
var Home = Home || {};

//View models should end in ViewModel
Home.HomeViewModel = function() {
    //make vm closure accesible everywhere within this scope
    var self = this;


    self.entitiesPaginator = new EntitiesPaginator();

    self.entitiesPaginator.entityType("Song");
    self.entitiesPaginator.selectedEntity = new common.Song();
    

    //observables
    self.eventTypes = ko.observable();
    self.artisticEventOrder = new common.ArtisticEventOrder();
    self.hoursAll = AppConstants.hoursAll;


    //computed

    //methods
    self.orderEvent = function () {
        server.postData(appConfig.homeOrderEvent, self.artisticEventOrder)
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
    var vm = new Home.HomeViewModel();
    ko.applyBindings(ko.validatedObservable(vm));
    $("#datePickerEvent").datepicker($.datepicker.regional["en-GB"]);
   
   server.getDataWithoutStringify(appConfig.adminGetAllEntitiesOfTypesUrl,
   {
       entityTypesComaSeparated: "EventType",
       orderByClausesComaSeparated: "Name"
   })
   .done(function (response) {
       vm.eventTypes(response[0]);
       vm.entitiesPaginator.currentPage(1);
   })
   .fail(function (message) {

       var errorText = AppConstants.FAILED_MESSAGE;
       if (message) {
           errorText += message;
       }

       toastr.error(errorText);
   });

})();