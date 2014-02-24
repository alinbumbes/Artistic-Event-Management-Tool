/// <reference path="../_refferences.js" />

//shared services must be global
var crudAndFilter = {};

crudAndFilter.orderBy = function (propertyName, entityType, takeClause, skipClause,
    orderByClauseObservable, entitiesObservable, totalEntitiesCountObservable) {
    if (!orderByClauseObservable()
        || orderByClauseObservable() !== propertyName) {
        orderByClauseObservable(propertyName);
    } else {
        orderByClauseObservable(propertyName + " desc");
    }

    server.postData(appConfig.adminGetFilteredUrl, {
        type: entityType,
        takeClause: takeClause,
        skipClause: skipClause,
        orderByClause: orderByClauseObservable()
    })
        .done(function (response) {
            entitiesObservable(response.queryResult);
            totalEntitiesCountObservable(response.totalCount);
        })
        .fail(function () {
            toastr.error(AppConstants.FAILED_MESSAGE);
        });
};

crudAndFilter.goToPage = function (pageNr, entityType, takeClause, skipClause,
    orderByClause, entitiesObservable, totalEntitiesCountObservable) {
    server.postData(appConfig.adminGetFilteredUrl,
    {
        type: entityType,
        takeClause: takeClause,
        skipClause: skipClause,
        orderByClause: orderByClause
    })
    .done(function (response) {
            entitiesObservable(response.queryResult);
            totalEntitiesCountObservable(response.totalCount);
    })
    .fail(function () {
        toastr.error(AppConstants.FAILED_MESSAGE);
    });
};

crudAndFilter.saveOrUpdate = function (entityType, objectStringified, takeClause, skipClause,
    orderByClause, entitiesObservable, totalEntitiesCountObservable, editPanelDialog) {
    var requestSaveData = {
        type: entityType,
        objectStringified: objectStringified,
        takeClause: takeClause,
        skipClause: skipClause,
        orderByClause: orderByClause
    };

    server.postData(appConfig.adminSaveOrOpdate, requestSaveData)
        .done(function(response) {
            editPanelDialog.dialog("close");
            
            entitiesObservable(response.queryResult);
            totalEntitiesCountObservable(response.totalCount);

            toastr.success(AppConstants.SAVE_SUCCESSFULL_MESSAGE);
        })
        .fail(function() {
            toastr.error(AppConstants.SAVE_FAILED_MESSAGE);
        });
};

crudAndFilter.delete = function (entityType, entityId, takeClause, skipClause, orderByClause,
     entitiesObservable, totalEntitiesCountObservable) {
    var requestDeleteData = {
        type: entityType,
        objectId: entityId,
        takeClause: takeClause,
        skipClause: skipClause,
        orderByClause: orderByClause
    };
    var promise = server.postData(appConfig.adminDelete, requestDeleteData)
    .done(function (response) {
        entitiesObservable(response.queryResult);
        totalEntitiesCountObservable(response.totalCount);

        toastr.success(AppConstants.DELETE_SUCCESSFULL_MESSAGE);
    })
    .fail(function () {
        toastr.error(AppConstants.DELETE_FAILED_MESSAGE);
    });
};

crudAndFilter.getEditDialog = function(jQuerySelectorString, width, height, callBackSave) {
    return $(jQuerySelectorString).dialog({
        width: width,
        height: height,
        autoOpen: false,
        modal: true,
        open: function() {
            $(this)
                .parent()
                .find(".ui-dialog-titlebar-close")
                .hide();
        },
        buttons: [{
            text: "Save",
            click: callBackSave 
        },
         {
             text: "Cancel",
             click: function () {
                 $(this).dialog("close");
             }
         }]
    });
}