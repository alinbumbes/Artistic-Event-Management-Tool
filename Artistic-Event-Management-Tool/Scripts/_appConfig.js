ko.validation.init({ grouping: { deep: true, observable: false } });

appConfig = {};

//HOME SECTION
appConfig.homeOrderEvent = urlFormater("Home/OrderEvent");

//ADMIN SECTION
appConfig.adminGetAllEntitiesOfTypesUrl = urlFormater("Admin/GetAllOfManyTypes");
appConfig.adminGetFilteredUrl = urlFormater("Admin/GetFiltered");
appConfig.adminSaveOrOpdate = urlFormater("Admin/SaveOrOpdate");
appConfig.adminDelete = urlFormater("Admin/Delete");
