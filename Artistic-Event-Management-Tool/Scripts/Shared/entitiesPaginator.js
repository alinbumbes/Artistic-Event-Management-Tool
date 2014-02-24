/// <reference path="../_refferences.js" />

//shared services must be global
EntitiesPaginator = function () {
    var self = this;
    //observables
    self.entityType = ko.observable();
    self.entities = ko.observable();
    self.selectedEntity = {};

    self.takeClause = ko.observable(10);
    self.orderByClause = ko.observable();
    self.totalCount = ko.observable();
    self.currentPage = ko.observable();
    

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
              self.orderByClause(), self.entities, self.totalCount);
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
            self.orderByClause, self.entities, self.totalCount);
    };

    self.addNew = function () {
        self.selectedEntity.updateFromModel();
        self.entityEditPanelDialog.dialog("open");
    };

    self.edit = function (selected) {
        self.selectedEntity.updateFromModel(selected);
        self.entityEditPanelDialog.dialog("open");
    };

    self.saveOrUpdate = function (entityStringified) {
        crudAndFilter.saveOrUpdate(self.entityType(), entityStringified, self.takeClause(),
            self.skipClause(), self.orderByClause(), self.entities, self.totalCount,
            self.entityEditPanelDialog);
    };

    self.delete = function (selected) {
        crudAndFilter.delete(self.entityType(), selected.Id, self.takeClause(),
          self.skipClause(), self.orderByClause(), self.entities, self.totalCount);
    };
};