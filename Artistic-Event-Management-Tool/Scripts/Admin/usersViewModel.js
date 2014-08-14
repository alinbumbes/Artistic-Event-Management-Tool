/// <reference path="../_refferences.js" />

//attach namespace
var Admin = Admin || {};

//View models should end in ViewModel
Admin.UsersViewModel = function () {
    //make vm closure accesible everywhere within this scope
    var self = this;

    self.entitiesPaginator = new EntitiesPaginator();

    self.entitiesPaginator.entityType("User");
    self.entitiesPaginator.selectedEntity = new common.User();
    

    //observables
    

};

//initializer
(function () {
    //apply bindings
    var vm = new Admin.UsersViewModel();
    ko.applyBindings(ko.validatedObservable(vm));

    vm.entitiesPaginator.currentPage(1);

   
})();

