/// <reference path="../_refferences.js" />

//attach namespace
var Admin = Admin || {};

Admin.MusicGenre = function () {
    var self = this;
    //observables
    self.Id = ko.observable(null);
    self.Name = ko.observable(null).extend({ required: true });
    self.Description = ko.observable(null);

    //computed

    //methods
    self.updateFromModel = function (model) {
        if (!model) {
            model = {};
        }

        self.Id(model.Id || null);
        self.Name(model.Name || null);
        self.Description(model.Description || null);
    };

};

//View models should end in ViewModel
Admin.MusicGenresViewModel = function () {
    //make vm closure accesible everywhere within this scope
    var self = this;
    
    self.entitiesPaginator = new EntitiesPaginator();
    
    self.entitiesPaginator.entityType("MusicGenre");
    self.entitiesPaginator.selectedEntity = new Admin.MusicGenre();
    self.entitiesPaginator.entityEditPanelDialog =
        crudAndFilter.getEditDialog("#musicGenreEditPanel", 500, 300,
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
            Description: self.entitiesPaginator.selectedEntity.Description()
        });

        self.entitiesPaginator.saveOrUpdate(entityStringified);
    };

    
};

//initializer
(function () {
    //apply bindings
    var vm = new Admin.MusicGenresViewModel();
    ko.applyBindings(ko.validatedObservable(vm));

    vm.entitiesPaginator.currentPage(1);
    
})();

