/// <reference path="../_refferences.js" />

//attach namespace
var Admin = Admin || {};

//View models should end in ViewModel
Admin.ArtisticEventOrdersViewModel = function () {
    //make vm closure accesible everywhere within this scope
    var self = this;

    self.entitiesPaginator = new EntitiesPaginator();

    self.entitiesPaginator.entityType("ArtisticEventOrder");
    self.entitiesPaginator.selectedEntity = new common.ArtisticEventOrder();
    self.entitiesPaginator.entityEditPanelDialog =
        crudAndFilter.getEditDialog("#artisticEventOrderDetailsPanel", 500, 500,
            function () {
                self.markEventPerformed();
            }, "Mark as performed!");


    //observables
    self.artisticEventOrders = ko.observable();


    //methods
    self.showDetails = function (selected) {
        self.selectedEntity.updateFromModel(selected);
        self.entityEditPanelDialog.dialog("open");
    };
    

    self.markEventPerformed = function (selected) {
        
    };

};

//initializer
(function () {
    //apply bindings
    var vm = new Admin.ArtisticEventOrdersViewModel();
    ko.applyBindings(ko.validatedObservable(vm));

    vm.entitiesPaginator.currentPage(1);

    server.getDataWithoutStringify(appConfig.adminGetAllEntitiesOfTypesUrl,
    {
        entityTypesComaSeparated: "ArtisticEventOrder",
        orderByClausesComaSeparated: "EventDate"
    })
    .done(function (response) {
        vm.artisticEventOrders(response[0]);
    })
    .fail(function (message) {

        var errorText = AppConstants.FAILED_MESSAGE;
        if (message) {
            errorText += message;
        }

        toastr.error(errorText);
    });


})();

