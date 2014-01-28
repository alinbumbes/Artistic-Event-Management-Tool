/// <reference path="../_refferences.js" />

//attach namespace
var Admin = Admin || {};

Admin.Song = function () {
    var self = this;
    //observables
    self.Id = ko.observable(null);
    self.Name = ko.observable(null).extend({ required: true });
    self.Author = ko.observable(null).extend({ required: true });
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
            server.postData(appConfig.adminGetFilteredUrl,
            {
                type: "Song",
                orderByClause: self.orderByClause(),
                takeClause: self.takeClause(),
                skipClause: self.skipClause()
            })
                .done(function (response) {
                    self.songs(response.queryResult);
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
            type: "Song",
            orderByClause: self.orderByClause(),
            takeClause: self.takeClause(),
            skipClause: self.skipClause()
        })
                  .done(function (response) {
                      self.songs(response.queryResult);
                      self.totalCount(response.totalCount);
                  })
              .fail(function () {
                  toastr.error(AppConstants.FAILED_MESSAGE);
              });
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
        var requestSaveData = {
            type: "Song",
            objectStringified: JSON.stringify({
                Id: self.selectedSong.Id(),
                Name: self.selectedSong.Name(),
                Author: self.selectedSong.Author(),
                DurationMin: self.selectedSong.DurationMin(),
                MusicGenre: self.selectedSong.MusicGenre()
            }),
            orderByClause: self.orderByClause(),
            takeClause: self.takeClause(),
            skipClause: self.skipClause()
        };

        server.postData(appConfig.adminSaveOrOpdate, requestSaveData)
            .done(function (response) {
                self.songEditPanelDialog.dialog("close");
                toastr.success(AppConstants.SAVE_SUCCESSFULL_MESSAGE);
                self.songs(response);
            })
            .fail(function () {
                toastr.error(AppConstants.SAVE_FAILED_MESSAGE);
            });
    };

    self.delete = function (selected) {
        self.selectedSong.updateFromModel(selected);
        var requestDeleteData = {
            type: "Song",
            objectId: self.selectedSong.Id(),
            orderByClause: self.orderByClause(),
            takeClause: self.takeClause(),
            skipClause: self.skipClause()
        };
        var promise = server.postData(appConfig.adminDelete, requestDeleteData)
            .done(function (response) {
                toastr.success(AppConstants.DELETE_SUCCESSFULL_MESSAGE);
                self.songs(response);
            })
            .fail(function () {
                toastr.error(AppConstants.DELETE_FAILED_MESSAGE);
            });
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
        entityTypesComaSeparated: "MusicGenre"
    })
    .done(function (response) {
        vm.musicGenres(response[0]);
        vm.musicGenres().each(function (musicGenre) {
            if (musicGenre.Parent) {
                musicGenre.Name = musicGenre.Parent.Name + " (" + musicGenre.Name + ")";
            } else {
                musicGenre.Name = musicGenre.Name + " (Other)";
            }
        });

        vm.musicGenres(vm.musicGenres().sortBy(function (musicGenre) {
            return musicGenre.Name;
        }));

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

