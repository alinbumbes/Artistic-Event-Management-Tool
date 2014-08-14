/// <reference path="../_refferences.js" />

//attach namespace
var Admin = Admin || {};

//View models should end in ViewModel
Admin.SongsViewModel = function () {
    //make vm closure accesible everywhere within this scope
    var self = this;

    self.entitiesPaginator = new EntitiesPaginator();

    self.entitiesPaginator.entityType("Song");
    self.entitiesPaginator.selectedEntity = new common.Song();
    self.entitiesPaginator.entityEditPanelDialog =
        crudAndFilter.getEditDialog("#songEditPanel", 500, 500,
            function () {
                self.saveOrUpdate();
            });


    //observables
   
    //methods
    self.saveOrUpdate = function () {
        if (!self.isValid()) {
            self.errors.showAllMessages();
            return;
        }

        var entityStringified = JSON.stringify({
            Id: self.entitiesPaginator.selectedEntity.Id(),
            Name: self.entitiesPaginator.selectedEntity.Name(),
            Author: self.entitiesPaginator.selectedEntity.Author(),
            DurationMin: self.entitiesPaginator.selectedEntity.DurationMin()
        });

        self.entitiesPaginator.saveOrUpdate(entityStringified);
    };

};

//initializer
(function () {
    //apply bindings
    var vm = new Admin.SongsViewModel();
    ko.applyBindings(ko.validatedObservable(vm));

    vm.entitiesPaginator.currentPage(1);
})();

