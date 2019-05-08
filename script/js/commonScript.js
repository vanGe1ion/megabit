//$(document).ready(function () {
    $("button").button();
    //$(".calendar").datepicker({dateFormat:"D dd.mm.yy", selectWeek: true});



    //проверка существования переменной
    var isset = function (variable) {
        return typeof(variable) != "undefined" && variable !== null
    };
    //проверка на число
    var isNumeric = function isNumeric(variable) {
        return !isNaN(parseFloat(variable)) && isFinite(variable)
    };



    //вызывает оповещени
    var Notificator = function (widgetHolder, text) {
        widgetHolder.fadeIn(1000).children("p").children("#text").text(text);
        setTimeout(function () {
            widgetHolder.fadeOut(500).children("p").children("#text").text("");
        }, 5000);
    };


//});
