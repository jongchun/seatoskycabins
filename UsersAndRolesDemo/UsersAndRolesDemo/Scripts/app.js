﻿/// <reference path="jquery-3.1.1.js" />
// var serviceUrl = './api/_OwnerPropertyContoller'; // **** OLD
//var serviceUrl = './api/OwnerProperty';
var serviceUrl = './api/Properties'


function sendRequest() {
    $("#properties").replaceWith("<span id='value1'></span>");
    var method = $('#method').val();
    $.ajax({
        type: method,
        url: serviceUrl
    }).done(function (data) {
        data.forEach(function (val) {
            callback(val)
        });
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#value1').text(jqXHR.responseText || textStatus);
    });
}
function callback(val) {
    $("#value1").replaceWith("<ul id='properties' />");
    //var str =  "propertyTitle: " + val.title  + "propertySummary: " + val.summary + " Nummer Bedrooms: " + val.numBedrooms + " Nummer Washrooms: " + val.numWashrooms + " Kitchen: " + val.kitchen + val.smokingAllowed + " max Number Guests" + val.maxNumberGuests + " Dimensions:" + val.dimensions;
    var str = "propertyTitle: " + val.title
    var strSummary = "propertySummary: " + val.summary
    var strBedroom = " Nummer Bedrooms: " + val.numBedrooms
    var strWashroom = val.numBedrooms + " Nummer Washrooms: " + val.numWashrooms
    var strKitchen = " Kitchen: " + val.kitchen
    var strSmoking = "smokingAllowed" + val.smokingAllowed
    var strMaxGuests = "max Number Guests" + val.maxNumberGuests
    var strDimensions = " Dimensions:" + val.dimensions
    $('<li/>', { text: str }).appendTo($('#properties'));
    $('<li/>', { text: strSummary }).appendTo($('#properties'));
    $('<li/>', { text: strBedroom }).appendTo($('#properties'));
    $('<li/>', { text: strWashroom }).appendTo($('#properties'));
    $('<li/>', { text: strKitchen }).appendTo($('#properties'));
    $('<li/>', { text: strSmoking }).appendTo($('#properties'));
    $('<li/>', { text: strMaxGuests }).appendTo($('#properties'));
    $('<li/>', { text: strDimensions }).appendTo($('#properties'));
    $('<br/>').appendTo($('#properties'));
}

// Deletes and refreshes list.
function updateList() {
    $("#properties").replaceWith("<span id='value1'>(Result)<br /></span>");
    sendRequest();
}
function find() {
    var id = $('#propertyIdFind').val();
    $.getJSON(serviceUrl,
        function (data) {
            if (data == null) {
                $('#propertyFind').text('Property not found.');
            }
            //var str = data.summary + ': ' + data.propertyType + ", " + data.UserId + ", " + data.numBedrooms + ", " + data.numWashrooms + ", " + data.kitchen + ", " + data.baseRate + ", " + data.builtYear + ", " + data.smokingAllowed + ", " + data.maxNumberGuests + ", " + data.availableDates + ", " + data.dimensions + '%';
            $('#propertyTitle').text("<a href='/Home/Details/" + data.Id + "'" + data.title + "</a>");
            $('#propertySummary').text(data.summary);
            $('#propertyNumBedrooms').text(data.numBedrooms);
            $('#propertyNumWashrooms').text(data.numWashrooms);
            $('#propertyKitchens').text(data.kitchen);
            $('#propertySmokingAllowed').text(data.smokingAllowed);
            $('#propertyMaxNumberGuests').text(data.maxNumberGuests);
            $('#propertyDimensions').text(data.dimensions);
        })
    .fail(
        function (jqueryHeaderRequest, textStatus, err) {
            $('#propertyFind').text('Find error: ' + err);
        });
}