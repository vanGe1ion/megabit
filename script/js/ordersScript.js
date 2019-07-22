var dates = [];
var menus = {};
var frees = {};
var dataPoolArray = {};
$(".options").hide();
$("#headRow th[id^='c-']").width(($("#headRow").width() - $("#headRow th.fit").width())/5);
$(".menuBody").append("<h4 align='left'>* - цена указана за дополнительные порции</h4>");

$("#mptable").append("<tr class='sumRow'><th class='db' /></tr>");
for(let i = 0; i < 5; ++i){
    $(".sumRow").append("<th class='db' id='c-" + i + "' />")
}



$("#calendar").datepicker({
    dateFormat:"dd.mm.yy",
    onSelect:function (){
        OrderHandler(this);
    }
})
    .blur(function () {
        $(this).datepicker("hide");
    });


$("#prev").click(function () {
    let curdate = moment($("#calendar").datepicker("getDate"));
    curdate.subtract(7, "d");
    $("#calendar").datepicker("setDate", curdate.format("DD.MM.Y"));
    OrderHandler("#calendar");
});

$("#next").click(function () {
    let curdate = moment($("#calendar").datepicker("getDate"));
    curdate.add(7, "d");
    $("#calendar").datepicker("setDate", curdate.format("DD.MM.Y"));
    OrderHandler("#calendar");
});

$("#today").click(function () {
    $("#calendar").datepicker("setDate", "+0d");
    OrderHandler("#calendar");
});

$(".calendarCall").button({icon: "ui-icon-calendar", showLabel: false}).click(function () {
    if($("#ui-datepicker-div").css("display") == "none")
        $("#calendar").datepicker("show");
    else
        $("#calendar").datepicker("hide");
});




//панель редактирования
EditPanelCreator();

$("#db-edit").click(function () {
    $(this).addClass("hidden");
    $("#db-save, #db-cancel").removeClass("hidden");
    $("button.calendar, .calendarCall, .horMenu").button("disable");
    $("#calendar").attr( "disabled", true);
    $(".options").fadeIn(500);

    //временной лимит закрывает редактирование заказов в пт 14:00
    if (dates[0].diff(moment(), "days", true) < 2.292)
        $.each(dates, function (key, date) {                                                                            //todo test timelimit
            $("#c-" + key + " button").button("disable");
        });
    else
        $.each(dates, function (key, date) {
            if($("th#c-" + key).hasClass("pHoliday"))
                $("#c-" + key + " button").button("disable");
        });

});

$("#db-cancel").click(function () {
    ThrowDialog("Отмена изменений", "Отменить все внесенные изменения?", function () {
        $("#db-edit").removeClass("hidden");
        $("#db-save, #db-cancel").addClass("hidden");
        $("button.calendar, .calendarCall, .horMenu").button("enable");
        $("#calendar").attr("disabled", false);


        $(".addSubMark").remove();
        let expand = TableData.expands[0]["Заказ"];
        let mainPool = dataPoolArray[TableData.poolName];
        let expPool = dataPoolArray[expand.poolName];
        $.each($(".addMark button.delete"), function (key, button) {
            let menuID =  $(button).attr("id").split("-")[1];

            //pool
            PoolDataRemover(mainPool, "create", null, menuID);
            PoolDataRemover(expPool, "create", menuID, null);
            //dom
            CollMarker(button, "addMark", true);
            OrderOptionsCreator($(button).parent(), "add");
            $(button).remove();
        });

        $(":contains('Отменить удл.')").click();

        $(".cancel").click();

        $.each($(".editSubMark"), function (key, dish) {
            $(dish).removeClass("editSubMark");
            let expand = TableData.expands[0]["Заказ"];
            let collID = $(dish).parent().parent().attr("id");
            let parent = $("tr.options #" + collID + " .delete").attr("id").split("-")[1];
            let dishID = $(dish).attr("id").split("-")[1];
            DishRowCreator($(dish), expand,  dataPoolArray[expand.poolName].olds[parent][dishID]);
        });

        setTimeout(function () {
            $(".options").fadeOut(150);
        },150);
        DataPoolCreator(dataPoolArray, TableData);
    })
});

$("#db-save").click(function () {
    if ($(".buttonSet .save").length)
        ThrowNotice("Info", "Подсказка", "js",
            "Имеются непринятые изменения. Пожалуйста, для продолжения сохраните или отмените их");
    else if($(".addMark, .addSubMark, .editMark, .editSubMark, .deleteMark").length == 0){
        $("#db-edit").removeClass("hidden");
        $("#db-save, #db-cancel").addClass("hidden");
        $("button.calendar, .calendarCall, .horMenu").button("enable");
        $("#calendar").attr("disabled", false);
        $(".options").fadeOut(150);
    }
    else {

        AjaxWaiter(200, function () {
            if($(".addSubMark, .addMark, .editSubMark, .deleteMark").length)
                ThrowNotice("Info", "Результат запроса", "js",
                    "Некоторые запросы не были выполнены");
            else{
                setTimeout(function () {
                    ThrowNotice("Info", "Результат запроса", "js",
                        "Все запросы выполнены успешно");
                    $("#db-edit").removeClass("hidden");
                    $("#db-save, #db-cancel").addClass("hidden");
                    $("button.calendar, .calendarCall, .horMenu").button("enable");
                    $("#calendar").attr("disabled", false);
                    $(".options").fadeOut(150);
                },150);
            }
        });

        DataPoolRequester(dataPoolArray, TableData, function (data) {
            switch (data.levelName) {
                case "delete":{
                    CollMarker("#order-" + data.id, "deleteMark", true);
                    let collID = $("#order-" + data.id).parent().attr("id");
                    $("#mptable td#"+collID+" div, tr.options td#"+collID).html("");
                    OrderOptionsCreator($("tr.options td#"+collID), "add");
                    break;
                }
                case "create":{
                    CollMarker("#order-" + data.id, "addMark", true);
                    break;
                }
                case "update":{break;}
            }
        }, function (data) {
            let collID = $("#order-" + data.parent).parent().attr("id");
            let dish = $("#" + collID + " #dish-" + data.id);
            switch (data.levelName) {
                case "delete":{dish.remove(); break;}
                case "update":{dish.removeClass("editSubMark"); break;}
                case "create":{dish.removeClass("addSubMark"); break;}
            }
        });
    }
});






//кнпки управоления меню
var OrderHandler = function(selector){
    AjaxWaiter(200, function () {
        //$("#db-edit").click();
    });
    menus = {};
    frees = {};
    dates = [];
    $(".todayMark").removeClass("todayMark");
    $(".pHoliday").removeClass("pHoliday");
    DataPoolCreator(dataPoolArray, TableData);

    $("#mptable td div, tr.options td").html("");

    //вормирование списка дат и заголовка
    let curdate = moment($(selector).datepicker('getDate'));
    if(curdate.weekday() == 0)
        curdate.subtract(7-1, "d");
    else
        curdate.subtract(curdate.weekday()-1, "d");
    for(let i = 0; i < 5; ++i){
        dates[i] = moment(curdate);
        $("#headRow th span").eq(i).html(dates[i].format("DD.MM.Y"));

        //запрос выходных
        $.get("https://isdayoff.ru/api/getdata",
            {
                year:dates[i].format("Y"),
                month:dates[i].format("MM"),
                day:dates[i].format("DD")
            },
            function (res) {
                switch (+res) {
                    case 0:{break;}
                    case 1:{
                        $("th#c-" + i).addClass("pHoliday");
                        break;
                    }
                    default:{
                        ThrowNotice("Warning", "Предупреждение", "isDayOffAPI",
                            "API вернул код " + res + " для " + dates[i].format("DD.MM.Y"))
                    }
                }
            })
            .fail(function () {
                ThrowNotice("Error", "Ошибка!", "ajax",
                    "Ошибка подключения к производственному календарю");
            });

        curdate.add(1, "d");
    }

    //запрос меню недели
    $.post("/script/php/Select.php",
        {
            queryName: "SelectMenuOfWeek",
            queryData:{
                leftLimit: dates[0].format("Y-MM-DD"),
                rightLimit: dates[4].format("Y-MM-DD")
            }
        },
        function (res) {
            $.each(res, function (key, data) {
                $.each(dates, function (dateKey, date) {
                    if(data.Date == date.format("Y-MM-DD"))
                        menus[dateKey] = data.Menu_ID;
                })
            })
        }, "json");


    $(selector).val(dates[0].format("DD.MM.Y") + " - " + dates[4].format("DD.MM.Y"));
    //$("h2:contains('Текущая неделя')").children("span").html("c " + dates[0].locale("ru").format("D MMMM Y г.") + " по " + dates[4].locale("ru").format("D MMMM Y г."));




    $.each($("#headRow th[id^='c-']"), function (key, th) {
        //запрос бесплатных блюд
        $.post(
            "/script/php/Select.php",
            {
                queryName: "SelectDishFree",
                queryData:{
                    Date: dates[key].format("Y-MM-DD"),
                }
            },
            function (res) {
                frees[key] = [];
                if(res.length){
                    $.each(res, function (fieldKey, field) {
                        frees[key].push(+field["Dish_ID"]);
                    });
                }
            },
            "json");

        //запрос заказа
        $.ajax({
            url:"/script/php/Select.php",
            type:"post",
            dataType:"json",
            data:{
                queryName: TableData.querySet["read"],
                queryData:{
                    Date: dates[key].format("Y-MM-DD"),
                    Employee_ID: EmpID
                }
            },

            success: function (res) {
                let orderOptCell = $("tr.options td#c-"+key);
                let orderOption = OrderOptionsCreator(orderOptCell, res.length? "delete" : "add");

                if($("th#c-" + key + " span").text() == moment().format("DD.MM.Y"))
                    CollMarker(orderOption, "todayMark");

                if(res.length) {
                    orderOption.attr("id", "order-" + res[0].Order_ID);

                    //запрос блюд заказа
                    let tableData = TableData.expands[0]["Заказ"];
                    $.ajax({
                        url:"/script/php/Select.php",
                        type:"post",
                        dataType:"json",
                        data:{
                            queryName: tableData.querySet["read"],
                            queryData:{
                                parent: res[0].Order_ID
                            }
                        },

                        success: function (dishRes) {
                            $.each(dishRes, function (dataRowKey, dataRow) {
                                $.each($("tr[id^=row-]"), function (dishTypeKey, dishTypeRow) {
                                    if($(dishTypeRow).attr("id").split("-")[1] == dataRow["Dish_Type_ID"]) {
                                        let dishElem = $("<div id='dish-" + dataRow.Dish_ID + "' class='dishOfMenu'></div>");
                                        let data = {
                                            Dish_ID: dataRow.Dish_Name,
                                            Count: dataRow.Count
                                        };
                                        // data.Price = frees[key].indexOf(+dataRow.Dish_ID) != -1 && data.Count == 1 ? "0 руб." : "*" + dataRow.Price + " руб.";
                                        data.Price = frees[key].indexOf(+dataRow.Dish_ID) != -1 ? (data.Count == 1 ? "0 руб." : "*" + dataRow.Price + " руб.") : dataRow.Price + " руб.";

                                        DishRowCreator(dishElem, tableData, data);
                                        $(dishTypeRow).children("#"+$(th).attr("id")).children().children(".options").before(dishElem);
                                    }
                                });
                            });
                            OrderPriceSum("c-" + key);
                            $(".options").hide();
                        },
                        error: function () {
                            ThrowNotice("Error", "Ошибка", "ajax",
                                "Ошибка чтения заказа на " + dates[key].format("DD.MM.Y"));
                        }
                    })
                }
                else
                    $(".sumRow th#c-" + key).text("Заказ не создан");

                $(".options").hide();
            },
            error: function () {
                ThrowNotice("Error", "Ошибка", "ajax",
                    "Ошибка чтения списка заказов (" + dates[key].format("DD.MM.Y") +")");
            }
        })
    });
};


var OrderOptionsCreator = function(optCell, type){
    let text, bclass, icon, func;

    switch(type){
        case "delete":{
            text = "Удалить заказ";
            bclass = "delete";
            icon = "ui-icon-trash";
            func = OrderDeleteHandler;

            $.each($("#headRow").siblings(), function (rownum, row) {
                $(row).children("td#"+optCell.attr("id")).children("div")
                    .append($("<div/>", {
                            class: "options"
                        })
                            .append($("<button/>", {
                                    text: "Добав. блюдо",
                                    click: function () {
                                        DishAddHandler(this);
                                    },
                                    class: "table add"
                                })
                                    .button({icon: "ui-icon-plusthick"})
                            )
                    )
            });

            break;
        }
        case "add":{
            text = "Новый заказ";
            bclass = "add";
            icon = "ui-icon-plusthick";
            func = OrderAddHandler;

            $.each($("#headRow").siblings(), function (rownum, row) {
                $(row).children("td#"+optCell.attr("id")).children("div").html('');
            });

            break;
        }
    }

    $(".sumRow th#" + $(optCell).attr("id")).html(type == "add" ? "Заказ не создан" : "Сумма заказа: <span />");

    return $("<button/>", {
        text: text,
        class: "table "+bclass,
        click: function(){func(this)}
    })
        .button({icon: icon})
        .appendTo(optCell);
};


var OrderAddHandler = function (buttonSelector) {
    let date = dates[$(buttonSelector).parent().attr("id").split("-")[1]];
    let currentDataPool = dataPoolArray[TableData.poolName];

    let newID = 1;
    let data = {};

    if(Object.keys(currentDataPool.create).length) {
        newID = Math.max.apply(null, Object.keys(currentDataPool.create)) + 1;

        data.id  = newID;
        data[Object.keys(TableData.tableForm)[0]] = date.format("Y-MM-DD");
        data.Employee_ID  = EmpID;

        //pool
        PoolDataInserter(currentDataPool, "create", null, newID, data);
        //dom
        CollMarker(buttonSelector, "addMark");
        OrderOptionsCreator($(buttonSelector).parent(), "delete").attr("id", "order-" + newID);
        OrderPriceSum($(buttonSelector).parent().attr("id"));
        $(buttonSelector).remove();
    }
    else {
        $.post("/script/php/Select.php", {queryName: "SelectMaxOrderID", queryData: {}}, "JSON")
            .done(function (res) {
                let parseRes = JSON.parse(res);
                if (parseRes.length)
                    newID = +parseRes[0].Order_ID + 1;

                data.id = newID;
                data[Object.keys(TableData.tableForm)[0]] = date.format("Y-MM-DD");
                data.Employee_ID = EmpID;

                //pool
                PoolDataInserter(currentDataPool, "create", null, newID, data);
                //dom
                CollMarker(buttonSelector, "addMark");
                OrderOptionsCreator($(buttonSelector).parent(), "delete").attr("id", "order-" + newID);
                OrderPriceSum($(buttonSelector).parent().attr("id"));
                $(buttonSelector).remove();
            })
            .fail(function () {
                ThrowNotice("Error", "Ошибка", "ajax",
                    "Ошибка чтения списка заказов (*)");
            });
    }
};


var OrderDeleteHandler = function (buttonSelector) {
    let expand = TableData.expands[0]["Заказ"];
    let currentDataPool = dataPoolArray[TableData.poolName];
    let expandDataPool = dataPoolArray[expand.poolName];
    let orderButtonCell = $(buttonSelector).parent();
    let cellID = orderButtonCell.attr("id");
    let orderID = $(buttonSelector).attr("id").split("-")[1];

    $("#" + orderButtonCell.attr("id") + " .cancel").click();

    if(orderButtonCell.hasClass("addMark")){
        let noticeText = "Удалить новый элемент" + ($("td#"+cellID+" .addSubMark").length > 0 ? " и все его вложения?" : "?");
        ThrowDialog("Удаление", noticeText, function () {
            //pool
            PoolDataRemover(currentDataPool, "create", null, orderID);
            PoolDataRemover(expandDataPool, "create", orderID, null);
            //dom
            CollMarker(buttonSelector, "addMark", true);
            OrderOptionsCreator($(buttonSelector).parent(), "add");
            $(buttonSelector).remove();
        });
    }
    else if(orderButtonCell.hasClass("deleteMark")){
        //pool
        PoolDataRemover(currentDataPool, "delete", null, orderID);
        //dom
        CollMarker(buttonSelector, "deleteMark", true);
        $(buttonSelector).button("option", "label", "Удалить заказ");
        $("tr[id^='row-'] td#"+cellID+" button").button("enable");
        $(".sumRow th#" + cellID).html("Сумма заказа: <span />");
        OrderPriceSum(cellID);
    }
    else{
        if($("td#"+cellID+" .editSubMark, td#"+cellID+" .addSubMark, td#"+cellID+" .deleteMark").length > 0){
            ThrowDialog("Удаление",
                "В меню имеются изминения. Пометка на удаление их отменит. Продолжить?",
                function () {
                    //subDelete
                    $.each($("td#"+cellID+" .deleteMark"), function (key, dish) {
                        $(dish).children(".buttonSet"). children(".delete").click();
                    });
                    //subAdd
                    $.each($("td#"+cellID+" .addSubMark"), function (key, dish) {
                        PoolDataRemover(expandDataPool, "create", orderID, $(dish).attr('id').split("-")[1]);
                        $(dish).children().hide(300, function () {
                            $(dish).remove();
                        });
                    });
                    //subEdit
                    $.each($("td#"+cellID+" .editSubMark"), function (key, dish) {
                        $(dish).removeClass("editSubMark");
                        DishRowCreator($(dish), expand, expandDataPool.olds[orderID][$(dish).attr('id').split("-")[1]]);
                        PoolDataRemover(expandDataPool, "update", orderID, $(dish).attr('id').split("-")[1]);
                        PoolDataRemover(expandDataPool, "olds", orderID, $(dish).attr('id').split("-")[1]);
                    });

                    //main
                    //pool
                    PoolDataInserter(currentDataPool, "delete", null, orderID, {id:orderID});
                    //dom
                    CollMarker(buttonSelector, "deleteMark");
                    $(buttonSelector).button("option", "label", "Отменить удл.");
                    $("tr[id^='row-'] td#"+cellID+" button").button("disable");
                    $(".sumRow th#" + cellID).html("Заказ будет удален");
                });
        }
        else{
            //pool
            PoolDataInserter(currentDataPool, "delete", null, orderID, {id:orderID});
            //dom
            CollMarker(buttonSelector, "deleteMark");
            $(buttonSelector).button("option", "label", "Отменить удл.");
            $("tr[id^='row-'] td#"+cellID+" button").button("disable");
            $(".sumRow th#" + cellID).html("Заказ будет удален");
        }
    }
};




//кнопки управления полями блюд
var DishAddHandler = function (buttonSelector) {
    $(buttonSelector).parent().before("<div class='dishOfMenu'/>");
    DishFormCreator($(buttonSelector).parent().prev(), TableData.expands[0]["Заказ"], {}, DishCreateSaveHandler, function (button) {
        $(button).parent().parent().children().hide(300, function () {
            $(button).parent().parent().remove();
        });
    });
};


var DishEditHandler = function(buttonSelector){

    let tableData = TableData.expands[0]["Заказ"];
    let dishRow = $(buttonSelector).parent().parent();
    let olddata = DishRowDataCreator(dishRow, tableData);

    DishFormCreator(dishRow, tableData, olddata,
        function (button){
            DishUpdateSaveHandler(button, olddata);
        },
        function (button) {
            DishRowCreator($(button).parent().parent(), tableData, olddata);
        });
};


var DishDeleteHandler = function(buttonSelector){

    let tableData = TableData.expands[0]["Заказ"];
    let currentDataPool = dataPoolArray[tableData.poolName];

    let dishRow = $(buttonSelector).parent().parent();
    let dishID = dishRow.attr("id").split("-")[1];

    let td = $(buttonSelector).parent().parent().parent().parent();
    let tdID = td.attr("id");
    let parent = $("tr.options #" + td.attr("id") + " .delete").attr("id").split("-")[1];


    if(dishRow.hasClass("addSubMark")){
        ThrowDialog("Удаление", "Удалить новый элемент?", function () {
            //pool
            PoolDataRemover(currentDataPool, "create", parent, dishID);
            //dom
            dishRow.children().hide(300, function () {
                OrderPriceSum(tdID);
                dishRow.remove();
            });
        })
    }
    else if(dishRow.hasClass("editSubMark")){
        ThrowDialog("Удаление", "Элемент был изменен. Вернуть первоначальное значение и пометить на удаление?", function () {
            //dom
            DishRowCreator(dishRow, tableData, currentDataPool.olds[parent][dishID]);
            dishRow.addClass("deleteMark").removeClass("editSubMark");
            let delButton = $(dishRow).children(".buttonSet").children(".delete");
            delButton.attr("title", "Отменить удл.").prev().button("disable");
            delButton.button("option", "label", "Отменить удл.");
            OrderPriceSum(tdID);
            //pool
            PoolDataRemover(currentDataPool, "olds", parent, dishID);
            PoolDataRemover(currentDataPool, "update", parent, dishID);
            PoolDataInserter(currentDataPool, "delete", parent, dishID, {id:dishID});
        })
    }
    else if(dishRow.hasClass("deleteMark")){
        //dom
        dishRow.removeClass("deleteMark");
        $(dishRow).children(".buttonSet").children(".delete").attr("title", "Удалить").prev().button("enable");
        $(buttonSelector).button("option", "label", "Удалить");
        OrderPriceSum(tdID);
        //pool
        PoolDataRemover(currentDataPool, "delete", parent, dishID);
    }
    else{
        //dom
        dishRow.addClass("deleteMark");
        $(dishRow).children(".buttonSet").children(".delete").attr("title", "Отменить удл.").prev().button("disable");
        $(buttonSelector).button("option", "label", "Отменить удл.");
        OrderPriceSum(tdID);
        //pool
        PoolDataInserter(currentDataPool, "delete", parent, dishID, {id:dishID});
    }
};




//обработчики операций с блюдами
var DishCreateSaveHandler = function(buttonSelector){
    let tableData = TableData.expands[0]['Заказ'];
    let currentPool = dataPoolArray[tableData.poolName];
    let dishRow = $(buttonSelector).parent().parent();

    if (NotEmpty(dishRow, tableData)){
        let select = dishRow.children(".orderSelect").children();
        let cellID = "#" + dishRow.parent().parent().attr("id");
        let parent = $("tr.options " + cellID + " .delete").attr("id").split("-")[1];

        //pool
        let data = DishFormDataCreator(dishRow, tableData);
        PoolDataInserter(currentPool, "create", parent, select.val(), data);
        //dom
        dishRow.addClass("addSubMark").attr("id", "dish-"+select.val());
        data = DishFormDataCreator(dishRow, tableData, true);
        DishRowCreator(dishRow, tableData, data);
    }
};


var DishUpdateSaveHandler = function(buttonSelector, olddata) {
    let tableData = TableData.expands[0]["Заказ"];
    let currentDataPool = dataPoolArray[tableData.poolName];
    let dishRow = $(buttonSelector).parent().parent();

    if (NotEmpty(dishRow, tableData)){
        let oldID = dishRow.attr("id").split("-")[1];
        dishRow.attr("id", "dish-" + dishRow.children(".orderSelect").children().val());
        let dishID = dishRow.attr("id").split("-")[1];
        let td = $(buttonSelector).parent().parent().parent().parent();
        let parent = $("tr.options #" + td.attr("id") + " .delete").attr("id").split("-")[1];


        //pool
        let data = DishFormDataCreator(dishRow, tableData);

        if(dishRow.hasClass("addSubMark")){
            //pool
            PoolDataInserter(currentDataPool, "create", parent, dishID, data);
        }
        else if(dishRow.hasClass("editSubMark")){
            //pool
            PoolDataInserter(currentDataPool, "update", parent, dishID, data);
        }
        else{
            //pool
            data.old_id = oldID;
            PoolDataInserter(currentDataPool, "update", parent, dishID, data);
            PoolDataInserter(currentDataPool, "olds", parent, dishID, olddata);
            //dom
            dishRow.addClass("editSubMark");
        }

        //dom
        data = DishFormDataCreator(dishRow, tableData, true);
        DishRowCreator(dishRow, tableData, data);
    }
};




//создание заполняемой формы
var DishFormCreator = function (containerHolder, tableData, data, callbackSave, callbackCancel) {
    let currentForm = tableData.tableForm;
    containerHolder.html("");


    $.each(currentForm, function( id, type ) {
        let newCell = $("<div/>").addClass(type);
        let inpValue = isset(data[id])?data[id]:"";
        let subID = type == "orderSelect"?
            {
                Dish_Type_ID: $(containerHolder).parent().parent().parent().attr("id").split("-")[1],
                Date: dates[$(containerHolder).parent().parent().attr("id").split("-")[1]].format("Y-MM-DD")
            }
            : $(containerHolder).parent().parent().parent().attr("id").split("-")[1];
        let newElem = FormElemCreator(type, id, "100%", inpValue, subID);
        newCell.append(newElem);
        containerHolder.append(newCell);
    });

    containerHolder.append($("<div/>", {
            class: "buttonSet"
        })
            .append($("<button/>", {
                text: "Сохранить",
                class: "save",
                css:{
                    fontSize: 11
                },
                click: function () {
                    callbackSave(this);
                }
            }).button({icon: "ui-icon-disk", showLabel:false}).removeClass("ui-widget"))
            .append($("<button/>", {
                text: "Отменить",
                class: "cancel",
                css:{
                    fontSize: 11
                },
                click: function () {
                    callbackCancel(this);
                }
            }).button({icon: "ui-icon-cancel", showLabel:false}).removeClass("ui-widget"))

    );
    let select = $(containerHolder).children().first().children();
    SelectHandler(select);
    containerHolder.children().children(":input, label").show(500).css('display','inline-block');
};

//создание поля
var DishRowCreator = function (containerHolder, tableData, data) {
    let currentForm = tableData.tableForm;
    containerHolder.html("");


    $.each(currentForm, function( id, type ) {
        let inpValue = data[id];
        let newCell = $("<div/>").addClass(type).append(inpValue);
        containerHolder.append(newCell);
    });

    containerHolder.append($("<div/>", {
            class: "buttonSet options"
        })
            .append($("<button/>", {
                text: "Редактировать",
                class: "edit",
                css:{
                    fontSize: 11
                },
                click: function () {
                    DishEditHandler(this);
                }
            }).button({icon: "ui-icon-pencil", showLabel:false}).removeClass("ui-widget"))
            .append($("<button/>", {
                text: "Удалить",
                class: "delete",
                css:{
                    fontSize: 11
                },
                click: function () {
                    DishDeleteHandler(this);
                }
            }).button({icon: "ui-icon-trash", showLabel:false}).removeClass("ui-widget"))

    );

    containerHolder.children().children(":input, label").show(500).css('display','inline-block');
};




//обработчик селектов и цены
var SelectHandler = function (select) {
    let tdID = $(select).parent().parent().parent().parent().attr("id");
    let dayID = tdID.split("-")[1];

    select.hover(function () {

        let row = $(this).parent().parent().parent().children(".dishOfMenu").last();
        let subkeys = [];

        while(row.length==1) {
            if (row.children().first().children("select").length) {
                let curSelect = row.children().first().children("select");
                let curSelVal = curSelect.children().children("option[value='" + curSelect.val() + "']").text();
                if (curSelVal !== $(this).children().children("option[value='" + $(this).val() + "']").text() && curSelVal != "")
                    subkeys.push(curSelVal);
            } else
                subkeys.push(row.children().first().text());
            row = row.prev();
        }


        let options = $(this).children().children("option");
        $.each(options, function (num, option) {
            $.each(subkeys, function (key, opt){
                if($(option).text() == opt) {
                    $(option).addClass("hidden");
                    return false;
                }
            });
        });

        options = $(this).children().children("option.hidden");
        $.each(options, function (num, option) {
            let mark = 0;
            $.each(subkeys, function (key, opt){
                if($(option).text() == opt) {
                    mark = 1;
                    return false;
                }
            });
            if(mark == 0)
                $(option).removeClass("hidden");


       });
     }, ()=>{});


    let count = select.parent().siblings(".count").children();

    //price
    select.on("change", function () {
        if(count.val() == "")
            count.val(1).change();
        else
            count.val(count.val()).change();
    });


    count.on("change keyup", function () {
        let data = {
            queryName: "SelectDishPrice",
            queryData: {
                id: select.val()
            }
        };
        $.post({
            url:"script/php/Select.php",
            data: data,
            success: function (res) {
                let price;
                if(frees[dayID].indexOf(+select.val()) != -1)
                    if(count.val() == 1)
                        price = "0 руб.";
                    else
                        price = "*" + res[0]['Price'] + " руб.";
                else if(count.val() == "" || !res.length)
                    price = "";
                else
                    price = res[0]['Price'] + " руб.";
                select.parent().siblings(".price").children().val(price);

                OrderPriceSum(tdID);
            },
            dataType: "json"
        })
            .fail(function () {
                select.parent().siblings(".price").children().val("");
                ThrowNotice("Error", "Ошибка", "ajax",
                    "Ошибка при чтении цены");
            })
    })
};




//сборщики данных
var DishFormDataCreator = function(containerHolder, tableData, isdom = null){
    let data = {};
    if(isdom == null)
        data = {Menu_ID:menus[$(containerHolder).parent().parent().attr("id").split("-")[1]]};

    $.each(tableData.tableForm, function (id, type) {
        switch (type) {
            case "orderSelect":{
                let select = $(containerHolder).children("."+type).children();
                data[id] = isdom == true ? select.children().children(":checked").text() : select.val();
                break;
            }
            case "price":{
                if(isdom)
                    data[id] = $(containerHolder).children("."+type).children().val();
                break;
            }
            default:{
                data[id] = $(containerHolder).children("."+type).children().val();
            }
        }
    });

    return data;
};

var DishRowDataCreator = function(containerHolder, tableData){
    let data = {};
    $.each(tableData.tableForm, function (id, type) {
        data[id] = $(containerHolder).children("."+type).text();
    });
    return data;
};




//вспомогательные функции
var NotEmpty = function (containerSelector, tableData){
    let errText = "";
    let iterator = 0;
    let form = tableData.tableForm;

    $.each(form, function( name, type ) {
        if ($(containerSelector).children().children("#"+name).val() == "") {
            let inpName = Object.values(tableData.headRow)[iterator];//$(containerSelector).parent().children("#headRow").children("#c-"+iterator).text();
            errText += inpName + "<br>";
        }
        ++iterator;
    });

    if (errText == '')
        return true;
    else {
        ThrowNotice("Info", "Подсказка", "js",
            "Следующие поля не должны быть пустыми:<br><p style='margin-left: 5%'>"+errText+"</p>");
        return false;
    }
};

var OrderPriceSum = function (dayID) {
    let sum = 0;
    $.each($("tr[id^='row-'] td#" + dayID), function (dishTypeKey, dishType) {
        $.each($(dishType).children().children(".dishOfMenu"), function (dishRowKey, dishRow) {
            if(!$(dishRow).hasClass("deleteMark")) {
                let dishCell = $(dishRow).children(".count");
                let dishCount = dishCell.children().length == 1 ? +dishCell.children().val() : +dishCell.text();

                dishCell = $(dishRow).children(".price");
                let dishPrice = (dishCell.children().length == 1 ? dishCell.children().val() : dishCell.text()).split(" ")[0];
                let isFree = dishPrice[0] == "*" ? 1 : 0;
                dishPrice = isFree ? +dishPrice.substr(1, dishPrice.length - 1) : +dishPrice;

                sum += dishPrice * dishCount - (isFree ? dishPrice : 0);
            }
        });
    });

    $(".sumRow th#" + dayID + " span").text(sum + " руб.");
};

var FormElemCreator = function(elemType, elemId, width, value, selSubID = null) {
    let newElem;
    switch (elemType) {
        case "orderSelect": {
            newElem = $("<select>", {
                name:elemId,
                id:elemId,
                class: "hidden",
                css:{
                    width:width,
                    height:"21px"
                }
            });
            $.ajax({
                type: "POST",
                dataType:"json",
                url: "/script/php/orderSelectFieldData.php",
                data: {select_data:selSubID},

                success: function (res) {
                    newElem.append("<option/>").append("<optgroup label='Бесплатные'/><optgroup label='Платные'/>");

                    $.each(res, function (id, data) {
                        let sel = "";
                        if (data[0] == value)
                            sel = "selected";
                        let option = $("<option "+sel+" value='"+id+"'>"+data[0]+"</option>");
                        newElem.children().eq(data[1] == "1" ? 1 : 2).append(option);
                    });
                },
                error: function () {
                    ThrowNotice("Error", "Ошибка!", "ajax","Ошибка создания элемента (OrderSelectField)");
                }
            });
            break;
        }
        case "select": {
            newElem = $("<select>", {
                name:elemId,
                id:elemId,
                class: "hidden",
                css:{
                    width:width,
                    height:"21px"
                }
            });
            let data = {select_id:elemId};
            if(selSubID) data.select_sub_id=selSubID;
            $.ajax({
                type: "POST",
                dataType:"json",
                url: "/script/php/selectFieldData.php",
                data: data,

                success: function (res) {
                    newElem.append("<option></option>");
                    $.each(res, function (val, label) {
                        let sel = "";
                        if (label == value)
                            sel = "selected";
                        newElem.append("<option "+sel+" value='"+val+"'>"+label+"</option>")
                    });
                },
                error: function () {
                    ThrowNotice("Error", "Ошибка!", "ajax","Ошибка создания элемента (SelectField)");
                }
            });
            break;
        }
        case "price": {
            newElem = $("<input>", {
                type:"text",
                name:elemId,
                id:elemId,
                value:value,
                class:"hidden",
                min:0,
                disabled:true,
                css:{
                    width:"calc("+width+" - 4px)",
                    minWidth: 40,
                    textAlign:"center"
                }
            });
            break;
        }
        case "free": {
            newElem = $("<label/>", {
                class:"hidden",
                css:{
                    width:width,
                }
            })
                .append($("<input>", {
                    type:"checkbox",
                    name:elemId,
                    id:elemId,
                    checked:value == 1 ? true : false,
                }))
                .append("Бесп.");
            break;
        }
        case "count":{
            newElem = $("<input>", {
                type:"number",
                name:elemId,
                id:elemId,
                value:value,
                class:"hidden",
                min:1,
                css:{
                    width:"calc("+width+" - 4px)",
                    minWidth: 30
                }
            });
            break;
        }
        default: {
            newElem = $("<input>", {
                type:elemType,
                name:elemId,
                id:elemId,
                value:value,
                class:"hidden",
                min:0,
                css:{
                    width:width,
                    minWidth: 40
                }
            });
        }
    }
    return newElem;
};





//init
$("#today").click();
$("h2:contains('Текущая неделя')").children("span").html("c " + dates[0].locale("ru").format("D MMMM Y г.") + " по " + dates[4].locale("ru").format("D MMMM Y г."));