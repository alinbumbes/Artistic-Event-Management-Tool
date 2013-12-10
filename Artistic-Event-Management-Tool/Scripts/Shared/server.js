/// <reference path="../_refferences.js" />

//shared services must be global
var server = {};

/**
@Sends a GET request to the server
@param {string} url - the url where the GET request is sent
@param {optional string} requestData - the request data that will be sent on the server
@returns {deffered} a deffered promise
*/
server.getData = function(url,requestData) {
    var promise = $.ajax({
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(requestData),
        url: url
    });

    return promise;
};

server.getDataWithoutStringify = function (url, requestData) {
    var promise = $.ajax({
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        data: requestData,
        url: url
    });

    return promise;
};

/**
@Sends a GET request to the server
@param {string} url - the url where the POST request is sent
@param {optional string} requestData - the request data that will be sent on the server
@returns {deffered} a deffered promise
*/

server.postData = function (url, requestData) {
    var promise = $.ajax({
        type: "POST",
        data: JSON.stringify(requestData),
        url: url,
        contentType: "application/json"
    });

    return promise;
};

server.postDataWithoutStringify = function (url, requestData) {
    var promise = $.ajax({
        type: "POST",
        data: requestData,
        url: url,
        contentType: "application/json"
    });

    return promise;
};

