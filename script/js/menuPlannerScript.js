var dates = [];
var queryDataPool = {};
DataPoolCreator(queryDataPool, TableData);
$(".wait-box, .overlay").hide();
$(".options").hide();
$("#headRow th[id^='c-']").width(($("#headRow").width() - $("#headRow th.fit").width())/5);

$("#calendar").css("text-align", "center").datepicker({
    dateFormat:"dd.mm.yy",
    onSelect:function (){
        MenuHandler(this);
    }
});



//кнопки управления формой
$("div.pageFooter").prepend($("<div />", {
        align:"center",
        css:{
            marginBottom: "5px"
        }
    })
        .append($("<button />", {
            id:"db-edit",
            text:"Режим редактирования"
        }).button())
        .append($("<button />", {
            id:"db-save",
            class:"hidden",
            text:"Сохранить изменения"
        }).button())
        .append($("<button />", {
            id:"db-cancel",
            class:"hidden",
            text:"Отменить изменения"
        }).button())
);
$("div.pageContent").height($("body").height()-$("div.pageFooter").height());

$("#db-edit").click(function () {
    $(this).addClass("hidden");
    $("#db-save, #db-cancel").removeClass("hidden");
    $(".options").fadeIn(500);
});

$("#db-cancel").click(function () {
    ThrowDialog("#dialogs", "Отмена изменений", "Отменить все внесенные изменения?", function () {
        $("#db-edit").removeClass("hidden");
        $("#db-save, #db-cancel").addClass("hidden");


        $(".addMark").remove();
        $(":contains('Отменить удл.')").click();
        $(".cancel").click();
        $.each($(".editMark"), function (key, row) {
            $(row).removeClass("editMark");
            NS_TableK1.RowCreator($(row), TableData, queryDataPool[TableData.poolName].olds[$(row).attr("id").split("-")[1]])
        });
        setTimeout(function () {
            $(".options").fadeOut(150);
        },150);
        DataPoolCreator(queryDataPool, TableData);
        $(".indicator").addClass("hidden").parent().width(1);
    })
});

$("#db-save").click(function () {
    if ($("table td .save").length)
        ThrowNotice("#notices", "Info", "Подсказка", "js",
            "Имеются непринятые изменения. Пожалуйста, для продолжения сохраните или отмените их");
    else {

        $(document).bind("ajaxStart", function () {
            $("div.overlay, div.wait-box").fadeIn(200);
        });

        $(document).bind("ajaxStop", function () {
            $("div.overlay, div.wait-box").fadeOut(200);

            if($(".addMark, .editMark, .deleteMark").length || $(".indicator.hidden").length < $(".indicator").length)
                ThrowNotice("#notices", "Info", "Результат запроса", "js",
                    "Некоторые запросы не были выполнены");
            else{
                setTimeout(function () {
                    ThrowNotice("#notices", "Info", "Результат запроса", "js",
                        "Все запросы выполнены успешно");
                    $("#db-edit").removeClass("hidden");
                    $("#db-save, #db-cancel").addClass("hidden");
                    $(".options").fadeOut(150);
                },150);
            }

            $(this).unbind();
        });

        DataPoolRequester(queryDataPool, TableData);
    }
});






var MenuHandler = function(selector){
    $("#mptable td div, tr.options td").html("");

    let curdate = moment($(selector).datepicker('getDate'));
    if(curdate.weekday() == 0)
        curdate.subtract(7-1, "d");
    else
        curdate.subtract(curdate.weekday()-1, "d");
    for(let i = 0; i < 5; ++i){
        dates[i] = moment(curdate);
        $("#headRow th span").eq(i).html(dates[i].format("DD.MM.Y"));
        curdate.add(1, "d");
    }
    $(selector).val(dates[0].format("DD.MM.Y") + " - " + dates[4].format("DD.MM.Y"));
    $("#availMenu h3 span").html(dates[0].format("DD.MM.Y") + " - " + dates[4].format("DD.MM.Y"));


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
                            $.each(dishRes, function (key, dataRow) {
                                $.each($("tr[id^=row-]"), function (key, dishTypeRow) {
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
                            ThrowNotice("#notices", "Error", "Ошиибка", "ajax",
                                "Ошибка чтения  меню на " + dates[key].format("DD.MM.Y"));
                        }
                    })
                }
                $(".options").hide();
            },
            error: function () {
                ThrowNotice("#notices", "Error", "Ошиибка", "ajax",
                    "Ошибка чтения списка меню (" + dates[key].format("DD.MM.Y") +")");
            }
        })
    });
};


var MenuAddHandler = function (buttonSelector) {
    let date = dates[$(buttonSelector).parent().attr("id").split("-")[1]];
    let currentDataPool = queryDataPool[TableData.poolName];

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
            // todo dishmenu
        })
        .fail(function () {
            ThrowNotice("#notices", "Error", "Ошиибка", "ajax",
                "Ошибка чтения списка меню (*)");
        });
};


var MenuDeleteHandler = function (buttonSelector) {
    let currentDataPool = queryDataPool[TableData.poolName];
    let prevCell = $(buttonSelector).parent().parent().prev().children("#"+$(buttonSelector).parent().attr("id"));
    let menuID = $(buttonSelector).attr("id").split("-")[1];

    if(prevCell.hasClass("addMark")){
        ThrowDialog("#dialogs", "Удаление", "Удалить новый элемент?", function () {
            //pool
            PoolDataRemover(currentDataPool, "create", null, menuID);
            //dom
            CollMarker(buttonSelector, "addMark", true);
            MenuOptionsCreator($(buttonSelector).parent(), "add");
            //todo dishmenu
            $(buttonSelector).remove();
        });
    }
    else if(prevCell.hasClass("deleteMark")){
        //pool
        PoolDataRemover(currentDataPool, "delete", null, menuID);
        //dom
        CollMarker(buttonSelector, "deleteMark", true);
        $(buttonSelector).text("Удалить меню").button({icon: "ui-icon-trash"});
    }
    else{
        let data = {
            id:menuID,
        };
        //pool
        PoolDataInserter(currentDataPool, "delete", null, menuID, data);            //todo dishes
        //dom
        CollMarker(buttonSelector, "deleteMark");
        $(buttonSelector).text("Отменить удл.").button({icon: "ui-icon-trash"});
    }
};


var DishAddHandler = function (buttonSelector) {
    $(buttonSelector).parent().before("<div class='dishOfMenu'/>");
    DishFormCreator($(buttonSelector).parent().prev(), TableData.expands[0]["Меню"], {}, DishSaveHandler, function (button) {
        $(button).parent().parent().children().children().hide(300, function () {
            $(button).parent().parent().remove();
        });
    });
};


var DishSaveHandler = function(buttonSelector){
    if ($(buttonSelector).parent().siblings("div.select").children().val() == '')
        ThrowNotice("#notices", "Info", "Подсказка", "js",
            "Блюдо не выбрано");
    else {
        let field = $(buttonSelector).parent().parent();
        let select = field.children(".select").children();
        let free = field.children(".free").children().children().prop("checked");
        let price = select.parent().siblings(".price").children().val();

        let tableData = TableData.expands[0]['Меню'];
        let currentPool = queryDataPool[tableData.poolName];
        let cellID = "#" + field.parent().parent().attr("id");
        let parent = $("tr.options " + cellID + " .delete").attr("id").split("-")[1];
        let data = {
            Dish_ID: select.val(),
            Free: +free
        };

        //pool
        PoolDataInserter(currentPool, "create", parent, select.val(), data);
        //dom
        field.addClass("addSubMark").attr("id", "dish-"+select.val());
        data = DishFormDataCreator(field, tableData);
        DishRowCreator(field, tableData, data);
    }
};


var DishEditHandler = function(buttonSelector){

    let tableData = TableData.expands[0]["Меню"];
    let currentDataPool = queryDataPool[tableData.poolName];
    let dishRow = $(buttonSelector).parent().parent();
    let olddata = DishRowDataCreator(dishRow, tableData);
    let td = $(buttonSelector).parent().parent().parent().parent();
    let parent = $("tr.options #" + td.attr("id") + " .delete").attr("id").split("-")[1];
    console.log(parent);

    DishFormCreator(dishRow, tableData, olddata,
    function (button) {
        let data = DishFormDataCreator($(button).parent().parent(), tableData);
        delete(data.Price);

        //pool
        PoolDataInserter(currentDataPool, "update", parent, dishRow.attr("id").split("-")[1], data);
        PoolDataInserter(currentDataPool, "olds", parent, dishRow.attr("id").split("-")[1], olddata);           //todo
        data = DishFormDataCreator(dishRow,tableData );
        DishRowCreator(dishRow, tableData, data);

    },
    function (button) {
        $(button).parent().parent().children().children().hide(300, function () {
            DishRowCreator($(button).parent().parent(), tableData, olddata);
        });
    });
};


var DishDeleteHandler = function(buttonSelector){
//     if ($(buttonSelector).parent().siblings("div.select").children().val() == '')
//         ThrowNotice("#notices", "Info", "Подсказка", "js",
//             "Блюдо не выбрано");
//     else {
//         let field = $(buttonSelector).parent().parent();
//         let select = field.children(".select").children();
//         let free = field.children(".free").children().children().prop("checked");
//         let price = select.parent().siblings(".price").children().val();
//
//         let tableData = TableData.expands[0]['Меню'];
//         let currentPool = queryDataPool[tableData.poolName];
//         let cellID = "#" + field.parent().parent().attr("id");
//         let parent = $("tr.options " + cellID + " .delete").attr("id").split("-")[1];
//         let data = {
//             Dish_ID: select.val(),
//             Free: free
//         };
//
//         //pool
//         PoolDataInserter(currentPool, "create", parent, select.val(), data);
//         //dom
//         field.addClass("addSubMark");
//         data = {
//             Dish_ID:select.children(":checked").text(),
//             Price: price,
//             Free: $("<label><input type='checkbox' " + (free?"checked":"") + " disabled>Бесп.</label>")
//         };
//         DishRowCreator(field, tableData, data);
//     }
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
    SelectReplicationHandler(select);
    containerHolder.children().children(":input, label").show(500).css('display','inline-block');
};



//создание заполняемой формы
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



var DishFormDataCreator = function(containerHolder, tableData){
    let data = {};

    $.each(tableData.tableForm, function (id, type) {
        switch (type) {
            case "select":{
                data[id] = $(containerHolder).children("."+type).children().val();
                break;
            }
            case "free":{
                data[id] = $(containerHolder).children("."+type).children().children().prop("checked") == true ? 1 : 0;
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


var SelectReplicationHandler = function (select) {
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
                ThrowNotice("#notices", "Error", "Ошибка", "ajax",
                    "Ошибка при чтении цены");
            });
    });
};



var CollMarker = function(buttonSelector, mark, isRemove = false){
    let coll = $("#mptable tr #"+$(buttonSelector).parent().attr("id"));
    isRemove ? coll.removeClass(mark) : coll.addClass(mark);
};












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



$("#today").click();
$("h2:contains('Текущая неделя')").append("c " + dates[0].locale("ru").format("D MMMM Y г.") + " по " + dates[4].locale("ru").format("D MMMM Y г."));
setTimeout(function () {
    $("#db-edit").click();
}, 300);