﻿ko.validation.init({ grouping: { deep: true, observable: false } });

appConfig = {};

//LOGIN SECTION
appConfig.loginUrl = urlFormater("Home/Login");

//HOME SECTION
appConfig.homeOrderEventUrl = urlFormater("Home/OrderEvent");

//ADMIN SECTION
appConfig.adminGetAllEntitiesOfTypesUrl = urlFormater("Admin/GetAllOfManyTypes");
appConfig.adminGetFilteredUrl = urlFormater("Admin/GetFiltered");
appConfig.adminSaveOrOpdateUrl = urlFormater("Admin/SaveOrOpdate");
appConfig.adminSetArtisticEventOrderWasPerformedUrl = urlFormater("Admin/SetArtisticEventOrderWasPerformed");
appConfig.adminDelete = urlFormater("Admin/Delete");
