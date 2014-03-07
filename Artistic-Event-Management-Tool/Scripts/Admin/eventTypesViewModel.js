/// <reference path="../_refferences.js" />

//attach namespace
var Admin = Admin || {};

Admin.EventType = function () {
    var self = this;
    //observables
    self.Id = ko.observable();
    self.Name = ko.observable().extend({ required: true });
    self.PricePerHour = ko.observable().extend({
        required: true,
        min: 0
    });
    self.MinimumDurationInHours = ko.observable().extend({
        required: true,
        min: 0
    });
    //computed

    //methods
    self.updateFromModel = function (model) {
        if (!model) {
            model = {};
        }

        self.Id(model.Id || null);
        self.Name(model.Name || null);
        self.PricePerHour(model.PricePerHour || null);
        self.MinimumDurationInHours(model.MinimumDurationInHours || null);
    };

};

//View models should end in ViewModel
Admin.EventTypes = function () {
    //make vm closure accesible everywhere within this scope
    var self = this;

    self.entitiesPaginator = new EntitiesPaginator();

    self.entitiesPaginator.entityType("EventType");
    self.entitiesPaginator.selectedEntity = new Admin.EventType();
    self.entitiesPaginator.entityEditPanelDialog =
        crudAndFilter.getEditDialog("#eventTypeEditPanel", 500, 500,
            function () {
                self.saveOrUpdate();
            });
    

    //methods
    self.saveOrUpdate = function () {
        if (!self.isValid()) {
            self.errors.showAllMessages();
            return;
        }

        var entityStringified = JSON.stringify({
            Id: self.entitiesPaginator.selectedEntity.Id(),
            Name: self.entitiesPaginator.selectedEntity.Name(),
            PricePerHour: self.entitiesPaginator.selectedEntity.PricePerHour(),
            MinimumDurationInHours: self.entitiesPaginator.selectedEntity.MinimumDurationInHours()
        });

        self.entitiesPaginator.saveOrUpdate(entityStringified);
    };
};

//initializer
(function() {
    //apply bindings
    var vm = new Admin.EventTypes();
    ko.applyBindings(ko.validatedObservable(vm));
    
    vm.entitiesPaginator.currentPage(1);
})();

