/// <reference path="../_refferences.js" />

//attach namespace
var Admin = Admin || {};

Admin.Song = function () {
    var self = this;
    //observables
    self.Id = ko.observable(null);
    self.Name = ko.observable(null).extend({ required: true });
    self.Author = ko.observable(null);
    self.DurationMin = ko.observable(null).extend({
        required: true,
        min: 0
    });
    self.MusicGenre = ko.observable(null).extend({ required: true });

    //computed

    //methods
    self.updateFromModel = function (model) {
        if (!model) {
            model = {};
        }

        self.Id(model.Id || null);
        self.Name(model.Name || null);
        self.Author(model.Author || null);
        self.DurationMin(model.DurationMin || null);
        self.MusicGenre(model.MusicGenre || null);

    };

};



//View models should end in ViewModel
Admin.SongsViewModel = function () {
    //make vm closure accesible everywhere within this scope
    var self = this;

    self.entitiesPaginator = new EntitiesPaginator();

    self.entitiesPaginator.entityType("Song");
    self.entitiesPaginator.selectedEntity = new Admin.Song();
    self.entitiesPaginator.entityEditPanelDialog =
        crudAndFilter.getEditDialog("#songEditPanel", 500, 500,
            function () {
                self.saveOrUpdate();
            });


    //observables
    self.musicGenres = ko.observable();


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
            DurationMin: self.entitiesPaginator.selectedEntity.DurationMin(),
            MusicGenre: self.entitiesPaginator.selectedEntity.MusicGenre()
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

    server.getDataWithoutStringify(appConfig.adminGetAllEntitiesOfTypesUrl,
    {
        entityTypesComaSeparated: "MusicGenre",
        orderByClausesComaSeparated: "Name"
    })
    .done(function (response) {
        vm.musicGenres(response[0]);
    })
    .fail(function (message) {

        var errorText = AppConstants.FAILED_MESSAGE;
        if (message) {
            errorText += message;
        }

        toastr.error(errorText);
    });


})();

