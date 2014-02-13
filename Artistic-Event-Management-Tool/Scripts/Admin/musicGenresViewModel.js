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

    //observables
    self.entityType = ko.observable("MusicGenre");
    self.musicGenres = ko.observable();
    self.selectedMusicGenre = new Admin.MusicGenre();

    self.orderByClause = ko.observable();
    self.takeClause = ko.observable(10);
    self.currentPage = ko.observable();
    self.totalCount = ko.observable(0);

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
            self.orderByClause(), self.musicGenres, self.totalCount);
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
        crudAndFilter.orderBy(propertyName, self.entityType(), self.takeClause(),  self.skipClause(),
            self.orderByClause, self.musicGenres, self.totalCount);
    };

    self.addNew = function () {
        self.selectedMusicGenre.updateFromModel();
        self.musicGenreEditPanelDialog.dialog("open");
    };

    self.edit = function (selected) {
        self.selectedMusicGenre.updateFromModel(selected);
        self.musicGenreEditPanelDialog.dialog("open");
    };

    self.saveOrUpdate = function () {

        var objectStringified = JSON.stringify({
            Id: self.selectedMusicGenre.Id(),
            Name: self.selectedMusicGenre.Name(),
            Description: self.selectedMusicGenre.Description()
        });

        crudAndFilter.saveOrUpdate(self.entityType(), objectStringified, self.takeClause(),
            self.skipClause(), self.orderByClause(), self.musicGenres, self.totalCount,
            self.musicGenreEditPanelDialog);
        
    };

    self.delete = function (selected) {
        crudAndFilter.delete(self.entityType(), selected.Id, self.takeClause(),
          self.skipClause(), self.orderByClause(), self.musicGenres, self.totalCount);
    };
};

//initializer
(function () {
    //apply bindings
    var vm = new Admin.MusicGenresViewModel();

    vm.musicGenreEditPanelDialog = $("#musicGenreEditPanel").dialog({
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
    
    vm.currentPage(1);
    ko.applyBindings(vm);
})();

