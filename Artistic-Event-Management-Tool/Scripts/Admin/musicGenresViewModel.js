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
            server.postData(appConfig.adminGetFilteredUrl,
            {
                type: "MusicGenre",
                orderByClause: self.orderByClause(),
                takeClause: self.takeClause(),
                skipClause: self.skipClause()
            })
                .done(function (response) {
                    self.musicGenres(response.queryResult);
                    self.totalCount(response.totalCount);
                })
                .fail(function () {
                    toastr.error(AppConstants.FAILED_MESSAGE);
                });
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
        if (!self.orderByClause()
            || self.orderByClause() !== propertyName) {
            self.orderByClause(propertyName);
        } else {
            self.orderByClause(propertyName + " desc");
        }

        server.postData(appConfig.adminGetFilteredUrl, {
            type: "MusicGenre",
            orderByClause: self.orderByClause(),
            takeClause: self.takeClause(),
            skipClause: self.skipClause()
        })
                  .done(function (response) {
                      self.musicGenres(response.queryResult);
                      self.totalCount(response.totalCount);
                  })
              .fail(function () {
                  toastr.error(AppConstants.FAILED_MESSAGE);
              });
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
        var requestSaveData = {
            type: "MusicGenre",
            objectStringified: JSON.stringify({
                Id: self.selectedMusicGenre.Id(),
                Name: self.selectedMusicGenre.Name(),
                Description: self.selectedMusicGenre.Description()
            }),
            orderByClause: self.orderByClause(),
            takeClause: self.takeClause(),
            skipClause: self.skipClause()
        };

        server.postData(appConfig.adminSaveOrOpdate, requestSaveData)
            .done(function (response) {
                self.musicGenreEditPanelDialog.dialog("close");
                toastr.success(AppConstants.SAVE_SUCCESSFULL_MESSAGE);
                self.musicGenres(response);
            })
            .fail(function () {
                toastr.error(AppConstants.SAVE_FAILED_MESSAGE);
            });
    };

    self.delete = function (selected) {
        self.selectedMusicGenre.updateFromModel(selected);
        var requestDeleteData = {
            type: "MusicGenre",
            objectId: self.selectedMusicGenre.Id(),
            orderByClause: self.orderByClause(),
            takeClause: self.takeClause(),
            skipClause: self.skipClause()
        };
        var promise = server.postData(appConfig.adminDelete, requestDeleteData)
            .done(function (response) {
                toastr.success(AppConstants.DELETE_SUCCESSFULL_MESSAGE);
                self.musicGenres(response);
            })
            .fail(function () {
                toastr.error(AppConstants.DELETE_FAILED_MESSAGE);
            });
    };
};

//initializer
(function() {
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



    server.getDataWithoutStringify(appConfig.adminGetAllEntitiesOfTypesUrl,
    {
        entityTypesComaSeparated: "MusicGenre",
        orderByClausesComaSeparated: "Name"
    })
    .done(function (response) {
        vm.musicGenres(response[0]);
        ko.applyBindings(vm);
    })
    .fail(function (message) {

        var errorText = AppConstants.FAILED_MESSAGE;
        if (message) {
            errorText += message;
        }

        toastr.error(errorText);
    });

    vm.currentPage(1);
   
})();

