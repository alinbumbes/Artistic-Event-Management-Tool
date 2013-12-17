ko.validation.init({ grouping: { deep: true, observable: false } });

appConfig = {};

//ADMIN SECTION
appConfig.adminGetAllEntitiesOfTypesUrl = urlFormater("Admin/GetAll");
appConfig.adminSaveOrOpdate = urlFormater("Admin/SaveOrOpdate");
