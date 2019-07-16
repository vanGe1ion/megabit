var dates = [];
var dataPoolArray = {};
$(".options").hide();
$("#headRow th[id^='c-']").width(($("#headRow").width() - $("#headRow th.fit").width())/5);





//календарная панель
$("#calendar").datepicker({
    dateFormat:"dd.mm.yy",
    onSelect:function (){
        MenuHandler(this);
    }
})
    .blur(function () {
        $(this).datepicker("hide");
    });


$("#prev").click(function () {
    let curdate = moment($("#calendar").datepicker("getDate"));
    curdate.subtract(7, "d");
    $("#calendar").datepicker("setDate", curdate.format("DD.MM.Y"));
    MenuHandler("#calendar");
});

$("#next").click(function () {
    let curdate = moment($("#calendar").datepicker("getDate"));
    curdate.add(7, "d");
    $("#calendar").datepicker("setDate", curdate.format("DD.MM.Y"));
    MenuHandler("#calendar");
});

$("#today").click(function () {
    $("#calendar").datepicker("setDate", "+0d");
    MenuHandler("#calendar");
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

    //временной лимит в два дня
    $.each(dates, function (key, date) {
        if (date.diff(moment(), "days") < 1 || $("th#c-" + key).hasClass("pHoliday"))
            $("#c-" + key + " button").button("disable");
    })
});

$("#db-cancel").click(function () {
    ThrowDialog("Отмена изменений", "Отменить все внесенные изменения?", function () {
        $("#db-edit").removeClass("hidden");
        $("#db-save, #db-cancel").addClass("hidden");
        $("button.calendar, .calendarCall, .horMenu").button("enable");
        $("#calendar").attr("disabled", false);


        $(".addSubMark").remove();
        let expand = TableData.expands[0]["Меню"];
        let mainPool = dataPoolArray[TableData.poolName];
        let expPool = dataPoolArray[expand.poolName];
        $.each($(".addMark button.delete"), function (key, button) {
            let menuID =  $(button).attr("id").split("-")[1];

            //pool
            PoolDataRemover(mainPool, "create", null, menuID);
            PoolDataRemover(expPool, "create", menuID, null);
            //dom
            CollMarker(button, "addMark", true);
            MenuOptionsCreator($(button).parent(), "add");
            $(button).remove();
        });

        $(":contains('Отменить удл.')").click();

        $(".cancel").click();

        $.each($(".editSubMark"), function (key, dish) {
            $(dish).removeClass("editSubMark");
            let expand = TableData.expands[0]["Меню"];
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
                    CollMarker("#menu-" + data.id, "deleteMark", true);
                    let collID = $("#menu-" + data.id).parent().attr("id");
                    $("#mptable td#"+collID+" div, tr.options td#"+collID).html("");
                    MenuOptionsCreator($("tr.options td#"+collID), "add");
                    break;
                }
                case "create":{
                    CollMarker("#menu-" + data.id, "addMark", true);
                    break;
                }
                case "update":{break;}
            }
        }, function (data) {
            let collID = $("#menu-" + data.parent).parent().attr("id");
            let dish = $("#" + collID + " #dish-" + data.id);
            switch (data.levelName) {
                case "delete":{dish.remove(); break;}
                case "update":{dish.removeClass("editSubMark"); break;}
                case "create":{dish.removeClass("addSubMark"); break;}
            }
        });
    }
});





//кнопки управоления меню
var MenuHandler = function(selector){
    AjaxWaiter(200);

    $(".todayMark").removeClass("todayMark");
    $(".pHoliday").removeClass("pHoliday");
    DataPoolCreator(dataPoolArray, TableData);

    $("#mptable td div, tr.options td").html("");

    let curdate = moment($(selector).datepicker('getDate'));
    if(curdate.weekday() == 0)
        curdate.subtract(7-1, "d");
    else
        curdate.subtract(curdate.weekday()-1, "d");
    for(let i = 0; i < 5; ++i){
        dates[i] = moment(curdate);
        $("#headRow th span").eq(i).html(dates[i].format("DD.MM.Y"));
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

    $(selector).val(dates[0].format("DD.MM.Y") + " - " + dates[4].format("DD.MM.Y"));
    //$("h2:contains('Текущая неделя')").children("span").html("c " + dates[0].locale("ru").format("D MMMM Y г.") + " по " + dates[4].locale("ru").format("D MMMM Y г."));


    $.each($("#headRow th[id^='c-']"), function (key, th) {
        $.ajax({
            url:"/script/php/Select.php",
            type:"post",
            dataType:"json",
            data:{
                queryName: TableData.querySet["read"],
                queryData:{
                    Date: dates[key].format("Y-MM-DD")
                }
            },

            success: function (res) {
                let menuOptCell = $("tr.options td#c-"+key);
                let menuOption = MenuOptionsCreator(menuOptCell, res.length? "delete" : "add");

                if($("th#c-" + key + " span").text() == moment().format("DD.MM.Y"))
                // let todaybutton = $("tr.options #" + $("span:contains("+moment().format("DD.MM.Y")+")").parent().attr("id") + " button");
                    CollMarker(menuOption, "todayMark");

                if(res.length) {
                    menuOption.attr("id", "menu-" + res[0].Menu_ID);
                    let tableData = TableData.expands[0]["Меню"];
                    $.ajax({
                        url:"/script/php/Select.php",
                        type:"post",
                        dataType:"json",
                        data:{
                            queryName: tableData.querySet["read"],
                            queryData:{
                                parent: res[0].Menu_ID
                            }
                        },

                        success: function (dishRes) {
                            $.each(dishRes, function (dataRowKey, dataRow) {
                                $.each($("tr[id^=row-]"), function (dishTypeKey, dishTypeRow) {
                                    if($(dishTypeRow).attr("id").split("-")[1] == dataRow["Dish_Type_ID"]) {
                                        let dishElem = $("<div id='dish-" + dataRow.Dish_ID + "' class='dishOfMenu'></div>");
                                        let data = {
                                            Dish_ID: dataRow.Dish_Name,
                                            Price: dataRow.Price + " руб.",
                                            Free: dataRow.Free
                                        };
                                        DishRowCreator(dishElem, tableData, data);
                                        $(dishTypeRow).children("#"+$(th).attr("id")).children().children(".options").before(dishElem);
                                    }
                                });
                            });
                            $(".options").hide();
                        },
                        error: function () {
                            ThrowNotice("Error", "Ошибка", "ajax",
                                "Ошибка чтения  меню на " + dates[key].format("DD.MM.Y"));
                        }
                    })
                }
                //$(".options").hide();
            },
            error: function () {
                ThrowNotice("Error", "Ошибка", "ajax",
                    "Ошибка чтения списка меню (" + dates[key].format("DD.MM.Y") +")");
            }
        })
    });
};


var MenuOptionsCreator = function(optCell, type){
    let text, bclass, icon, func;

    switch(type){
        case "delete":{
            text = "Удалить меню";
            bclass = "delete";
            icon = "ui-icon-trash";
            func = MenuDeleteHandler;

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
            text = "Новое меню";
            bclass = "add";
            icon = "ui-icon-plusthick";
            func = MenuAddHandler;

            $.each($("#headRow").siblings(), function (rownum, row) {
                $(row).children("td#"+optCell.attr("id")).children("div").html('');
            });

            break;
        }
    }

    return $("<button/>", {
        text: text,
        class: "table "+bclass,
        click: function(){func(this)}
    })
        .button({icon: icon})
        .appendTo(optCell);
};


var MenuAddHandler = function (buttonSelector) {
    let date = dates[$(buttonSelector).parent().attr("id").split("-")[1]];
    let currentDataPool = dataPoolArray[TableData.poolName];

    $.post("/script/php/Select.php", {queryName: "SelectMaxMenuID", queryData:{}}, "JSON")
        .done(function (res) {
            let newID;
            let parseRes = JSON.parse(res);
            let data = {};

            if(parseRes.length)
                newID = +parseRes[0].Menu_ID + 1;
            else
                newID = Object.keys(currentDataPool.create).length ? Math.max.apply(null, Object.keys(currentDataPool.create)) + 1 : 1;

            data.id  = newID;
            data[Object.keys(TableData.tableForm)[0]] = date.format("Y-MM-DD");

            //pool
            PoolDataInserter(currentDataPool, "create", null, newID, data);
            //dom
            CollMarker(buttonSelector, "addMark");
            MenuOptionsCreator($(buttonSelector).parent(), "delete").attr("id", "menu-" + newID);
            $(buttonSelector).remove();
        })
        .fail(function () {
            ThrowNotice("Error", "Ошибка", "ajax",
                "Ошибка чтения списка меню (*)");
        });
};


var MenuDeleteHandler = function (buttonSelector) {
    let expand = TableData.expands[0]["Меню"];
    let currentDataPool = dataPoolArray[TableData.poolName];
    let expandDataPool = dataPoolArray[expand.poolName];
    let menuButtonCell = $(buttonSelector).parent();
    let cellID = menuButtonCell.attr("id");
    let menuID = $(buttonSelector).attr("id").split("-")[1];

    $("#" + menuButtonCell.attr("id") + " .cancel").click();

    if(menuButtonCell.hasClass("addMark")){
        let dialogText = "Удалить новый элемент" + ($("td#"+cellID+" .addSubMark").length > 0 ? " и все его вложения?" : "?");
        ThrowDialog("Удаление", dialogText, function () {
            //pool
            PoolDataRemover(currentDataPool, "create", null, menuID);
            PoolDataRemover(expandDataPool, "create", menuID, null);
            //dom
            CollMarker(buttonSelector, "addMark", true);
            MenuOptionsCreator($(buttonSelector).parent(), "add");
            $(buttonSelector).remove();
        });
    }
    else if(menuButtonCell.hasClass("deleteMark")){
        //pool
        PoolDataRemover(currentDataPool, "delete", null, menuID);
        //dom
        CollMarker(buttonSelector, "deleteMark", true);
        $(buttonSelector).button("option", "label", "Удалить меню");
        $("tr[id^='row-'] td#"+cellID+" button").button("enable");
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
                        PoolDataRemover(expandDataPool, "create", menuID, $(dish).attr('id').split("-")[1]);
                        $(dish).children().hide(300, function () {
                            $(dish).remove();
                        });
                    });
                    //subEdit
                    $.each($("td#"+cellID+" .editSubMark"), function (key, dish) {
                        $(dish).removeClass("editSubMark");
                        DishRowCreator($(dish), expand, expandDataPool.olds[menuID][$(dish).attr('id').split("-")[1]]);
                        PoolDataRemover(expandDataPool, "update", menuID, $(dish).attr('id').split("-")[1]);
                        PoolDataRemover(expandDataPool, "olds", menuID, $(dish).attr('id').split("-")[1]);
                    });

                    //main
                    //pool
                    PoolDataInserter(currentDataPool, "delete", null, menuID, {id:menuID});
                    //dom
                    CollMarker(buttonSelector, "deleteMark");
                    $(buttonSelector).button("option", "label", "Отменить удл.");
                    $("tr[id^='row-'] td#"+cellID+" button").button("disable");
                });
        }
        else{
            //pool
            PoolDataInserter(currentDataPool, "delete", null, menuID, {id:menuID});
            //dom
            CollMarker(buttonSelector, "deleteMark");
            $(buttonSelector).button("option", "label", "Отменить удл.");
            $("tr[id^='row-'] td#"+cellID+" button").button("disable");
        }
    }
};




//кнопки управления полями блюд
var DishAddHandler = function (buttonSelector) {
    $(buttonSelector).parent().before("<div class='dishOfMenu'/>");
    DishFormCreator($(buttonSelector).parent().prev(), TableData.expands[0]["Меню"], {}, DishCreateSaveHandler, function (button) {
        $(button).parent().parent().children().hide(300, function () {
            $(button).parent().parent().remove();
        });
    });
};


var DishEditHandler = function(buttonSelector){

    let tableData = TableData.expands[0]["Меню"];
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

    let tableData = TableData.expands[0]["Меню"];
    let currentDataPool = dataPoolArray[tableData.poolName];

    let dishRow = $(buttonSelector).parent().parent();
    let dishID = dishRow.attr("id").split("-")[1];

    let td = $(buttonSelector).parent().parent().parent().parent();
    let parent = $("tr.options #" + td.attr("id") + " .delete").attr("id").split("-")[1];


    if(dishRow.hasClass("addSubMark")){
        ThrowDialog("Удаление", "Удалить новый элемент?", function () {
            //pool
            PoolDataRemover(currentDataPool, "create", parent, dishID);
            //dom
            dishRow.children().hide(300, function () {
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
        //pool
        PoolDataRemover(currentDataPool, "delete", parent, dishID);
    }
    else{
        //dom
        dishRow.addClass("deleteMark");
        $(dishRow).children(".buttonSet").children(".delete").attr("title", "Отменить удл.").prev().button("disable");
        $(buttonSelector).button("option", "label", "Отменить удл.");
        //pool
        PoolDataInserter(currentDataPool, "delete", parent, dishID, {id:dishID});
    }
};




//обработчики операций с блюдами
var DishCreateSaveHandler = function(buttonSelector){
    if ($(buttonSelector).parent().siblings("div.select").children().val() == '')
        ThrowNotice("Info", "Подсказка", "js",
            "Блюдо не выбрано");
    else {
        let field = $(buttonSelector).parent().parent();
        let select = field.children(".select").children();

        let tableData = TableData.expands[0]['Меню'];
        let currentPool = dataPoolArray[tableData.poolName];
        let cellID = "#" + field.parent().parent().attr("id");
        let parent = $("tr.options " + cellID + " .delete").attr("id").split("-")[1];

        //pool
        let data = DishFormDataCreator(field, tableData);
        PoolDataInserter(currentPool, "create", parent, select.val(), data);
        //dom
        field.addClass("addSubMark").attr("id", "dish-"+select.val());
        data = DishFormDataCreator(field, tableData, true);
        DishRowCreator(field, tableData, data);
    }
};


var DishUpdateSaveHandler = function(buttonSelector, olddata) {
    if ($(buttonSelector).parent().siblings("div.select").children().val() == '')
        ThrowNotice("Info", "Подсказка", "js",
            "Блюдо не выбрано");
    else {
        let tableData = TableData.expands[0]["Меню"];
        let currentDataPool = dataPoolArray[tableData.poolName];

        let dishRow = $(buttonSelector).parent().parent();
        let oldID = dishRow.attr("id").split("-")[1];
        dishRow.attr("id", "dish-" + dishRow.children(".select").children().val());
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
        let subID = $(containerHolder).parent().parent().parent().attr("id").split("-")[1];
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
        let inpValue;
        if(type == "free")
            inpValue = $("<label><input type='checkbox' " + (data[id] == 1?"checked":"") + " disabled>Бесп.</label>");
        else
            inpValue = data[id];
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
    select.hover(function () {
        let row = $(this).parent().parent().parent().children(".dishOfMenu").last();
        let subkeys = [];

        while(row.length==1) {
            if (row.children().first().children("select").length) {
                let curSelect = row.children().first().children("select");
                let curSelVal = curSelect.children("option[value='" + curSelect.val() + "']").text();
                if (curSelVal !== $(this).children("option[value='" + $(this).val() + "']").text() && curSelVal != "")
                    subkeys.push(curSelVal);
            } else
                subkeys.push(row.children().first().text());
            row = row.prev();
        }


        let options = $(this).children("option");
        $.each(options, function (num, option) {
            $.each(subkeys, function (key, opt){
                if($(option).text() == opt) {
                    $(option).addClass("hidden");
                    return false;
                }
            });
        });

        options = $(this).children("option.hidden");
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

    //price
    select.on("change", function () {
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
                select.parent().siblings(".price").children().val(res.length? (res[0]['Price'] + " руб.") : "");
            },
            dataType: "json"
        })
            .fail(function () {
                select.parent().siblings(".price").children().val("");
                ThrowNotice("Error", "Ошибка", "ajax",
                    "Ошибка при чтении цены");
            });
    });
};




//сборщики данных
var DishFormDataCreator = function(containerHolder, tableData, isdom = null){
    let data = {};

    $.each(tableData.tableForm, function (id, type) {
        switch (type) {
            case "select":{
                let select = $(containerHolder).children("."+type).children();
                data[id] = isdom == true ? select.children(":checked").text() : select.val();
                break;
            }
            case "free":{
                data[id] = $(containerHolder).children("."+type).children().children().prop("checked") == true ? 1 : 0;
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
        switch (type) {

            case "free":{
                data[id] = $(containerHolder).children("."+type).children().children().prop("checked") == true ? 1 : 0;
                break;
            }
            default:{
                data[id] = $(containerHolder).children("."+type).text();
            }
        }
    });

    return data;
};




//init
$("#today").click();
$("h2:contains('Текущая неделя')").children("span").html("c " + dates[0].locale("ru").format("D MMMM Y г.") + " по " + dates[4].locale("ru").format("D MMMM Y г."));