//$(document).ready(function () {
    $("button").button();
    $("div.content").css("max-height", +$("html").css("height").split("px")[0]-$("footer").css("height").split("px")[0]);


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
        $("div.content").css("max-height", +$("html").css("height").split("px")[0]-$("footer").css("height").split("px")[0]);
        setTimeout(function () {
            widgetHolder.fadeOut(500).children("p").children("#text").text("");
            setTimeout(function () {
                $("div.content").css("max-height", +$("html").css("height").split("px")[0]-$("footer").css("height").split("px")[0]);
            }, 510);
        }, 5000);

    };


//});