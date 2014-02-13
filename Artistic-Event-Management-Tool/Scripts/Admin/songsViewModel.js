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

    //observables
    self.entityType = ko.observable("Song");
    self.songs = ko.observable();
    self.musicGenres = ko.observable();
    self.orderByClause = ko.observable();
    self.takeClause = ko.observable(10);
    self.currentPage = ko.observable();
    self.totalCount = ko.observable(0);
    self.selectedSong = new Admin.Song();

    //computed
    self.skipClause = ko.computed(function () {
        return self.takeClause() * (self.currentPage() - 1);
    });

    self.lastPage = ko.computed(function () {
        return Math.round(self.totalCount() / self.takeClause());
    });

    self.canGoToFirstPage = ko.computed(function () {
        return self.currentPage() > 1;
    });

    self.canGoBack = ko.computed(function () {
        return self.currentPage() > 1;
    });

    self.canGoForward = ko.computed(function () {
        return self.currentPage() < self.lastPage();
    });

    self.canGoToLastPage = ko.computed(function () {
        return self.currentPage() < self.lastPage();
    });

    //subscriptions
    self.currentPage.subscribe(function (newValue) {
        if (newValue) {
          crudAndFilter.goToPage(newValue, self.entityType(), self.takeClause(), self.skipClause(),
                self.orderByClause(), self.songs, self.totalCount);
        }
    });

    //methods
    self.goToFirstPage = function () {
        self.currentPage(1);
    };

    self.goBack = function () {
        var currentPage = self.currentPage();
        self.currentPage(--currentPage);
    };

    self.goForward = function () {
        var currentPage = self.currentPage();
        self.currentPage(++currentPage);
    };

    self.goToLastPage = function () {
        self.currentPage(self.lastPage());
    };

    self.orderBy = function (propertyName) {
        crudAndFilter.orderBy(propertyName, self.entityType(), self.takeClause(), self.skipClause(),
            self.orderByClause, self.songs, self.totalCount);
    };

    self.addNew = function () {
        self.selectedSong.updateFromModel();
        self.songEditPanelDialog.dialog("open");
    };

    self.edit = function (selected) {
        self.selectedSong.updateFromModel(selected);
        self.songEditPanelDialog.dialog("open");
    };

    self.saveOrUpdate = function () {

        var objectStringified = JSON.stringify({
            Id: self.selectedSong.Id(),
            Name: self.selectedSong.Name(),
            Author: self.selectedSong.Author(),
            DurationMin: self.selectedSong.DurationMin(),
            MusicGenre: self.selectedSong.MusicGenre()
        });

        crudAndFilter.saveOrUpdate(self.entityType(), objectStringified, self.takeClause(),
           self.skipClause(), self.orderByClause(), self.songs, self.totalCount, self.songEditPanelDialog);
        
    };

    self.delete = function (selected) {
        crudAndFilter.delete(self.entityType(),selected.Id,self.takeClause(),
           self.skipClause(), self.orderByClause(), self.songs, self.totalCount);
    };

};

//initializer
(function () {
    //apply bindings
    var vm = new Admin.SongsViewModel();
    
    vm.songEditPanelDialog = $("#songEditPanel").dialog({
        width: 500,
        height: 500,
        autoOpen: false,
        modal: true,
        open: function () {
            $(this)
                .parent()
                .find(".ui-dialog-titlebar-close")
                .hide();
        },
        buttons: [{
            text: "Save",
            click: function () {
                vm.saveOrUpdate();
            }
        },
         {
             text: "Cancel",
             click: function () {
                 $(this).dialog("close");
             }
         }]
    });
    
    server.getDataWithoutStringify(appConfig.adminGetAllEntitiesOfTypesUrl,
    {
        entityTypesComaSeparated: "MusicGenre",
        orderByClausesComaSeparated:"Name"
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

    vm.currentPage(1);
    ko.applyBindings(vm);
})();

