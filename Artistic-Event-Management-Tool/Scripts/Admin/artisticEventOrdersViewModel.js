/// <reference path="../_refferences.js" />

//attach namespace
var Admin = Admin || {};

//View models should end in ViewModel
Admin.ArtisticEventOrdersViewModel = function () {
    //make vm closure accesible everywhere within this scope
    var self = this;

    self.entitiesPaginator = new EntitiesPaginator();

    self.entitiesPaginator.entityType("ArtisticEventOrder");
    self.entitiesPaginator.orderByClause("EventDate desc");
        
    self.entitiesPaginator.selectedEntity = new common.ArtisticEventOrder();
    self.entitiesPaginator.entityEditPanelDialog =
        crudAndFilter.getEditDialog("#artisticEventOrderDetailsPanel", 800, 400);


    //observables
    self.artisticEventOrders = ko.observable();


    //methods
    self.markEventPerformed = function (selected) {

        server.postData(appConfig.adminSetArtisticEventOrderWasPerformedUrl,
        {
            artisticEventOrderId: selected.Id
        })
        .done(function (response) {
            self.entitiesPaginator.entities(response);
            self.entitiesPaginator.currentPage(1);
            toastr.success(AppConstants.MARK_AS_PERFORMED);
        })
        .fail(function () {
            toastr.error(AppConstants.FAILED_MESSAGE);
        });
    };

};

//initializer
(function () {
    //apply bindings
    var vm = new Admin.ArtisticEventOrdersViewModel();
    ko.applyBindings(ko.validatedObservable(vm));

    vm.entitiesPaginator.currentPage(1);
})();

