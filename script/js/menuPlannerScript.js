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
                    //todo dish menu


                }

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
        PoolDataInserter(currentDataPool, "delete", null, menuID, data);
        //dom
        CollMarker(buttonSelector, "deleteMark");
        $(buttonSelector).text("Отменить удл.").button({icon: "ui-icon-trash"});
    }
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
                                    $(this).parent().before("<div class='dishOfMenu'/>");
                                    DishFormCreator($(this).parent().prev(), TableData.expands[0]["Меню"], {});
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
var DishFormCreator = function (containerHolder, tableData, data) {
    let currentForm = tableData.tableForm;
    containerHolder.html("");


    $.each(currentForm, function( id, type ) {
        let newCell = $("<div/>").width("25%").css("margin", "1px");
        let inpValue = isset(data[id])?data[id]:"";
        let newElem = FormElemCreator(type, id, "100%", inpValue);
        newCell.append(newElem);
        containerHolder.append(newCell);
    });

    containerHolder.append($("<div/>").width("25%")
        .append($("<button/>", {
            text: "Сохранить",
            class: "save",
            css:{
                fontSize: 11
            },
            click: function () {

            }
        }).button({icon: "ui-icon-disk", showLabel:false}).removeClass("ui-widget"))
        .append($("<button/>", {
            text: "Отменить",
            class: "cancel",
            css:{
                fontSize: 11
            },
            click: function () {
                containerHolder.children().children(":input, label").hide(300, function () {
                    $(this).parent().parent().remove();
                });

            }
        }).button({icon: "ui-icon-cancel", showLabel:false}).removeClass("ui-widget"))

    );

    containerHolder.children().children(":input, label").show(500).css('display','inline-block');
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
$("#db-edit").click();



// <div class="orderFlex">
// <div style="
// width: 25%;
// ">
// <select style="
// width: 100%;
// "><option>123</option></select>
// </div>
// <div style="
// width: 25%;
// ">
// 154 руб.
// </div>
// <div style="
// width: 25%;
// ">
//     <label>
//          <input type="checkbox">Бесп.
//     </label>
// </div>
//     <div style="
// width: 25%;
// ">
// <button id="but1" class="table"></button>
// <button id="but2" class="table"></button>
// </div>
// </div>