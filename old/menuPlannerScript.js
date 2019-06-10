var dates = [];


$("#calendar").css("text-align", "center").datepicker({
    dateFormat:"dd.mm.yy",
    onSelect:function (){
        $(".main_block").slideUp(0);
        MenuHandler(this)
    }
});


var MenuHandler = function(selector){
    $.each($("table.menu"), function (key, table) {
        $(table).html("");
    });

    let curdate = moment(moment($(selector).datepicker('getDate')));
    if(curdate.weekday() == 0)
        curdate.subtract(7-1, "d");
    else
        curdate.subtract(curdate.weekday()-1, "d");


    for(let i = 0; i < 6; ++i){
        dates[i] = moment(curdate);
        curdate.add(1, "d");
    }


    $(selector).val(dates[0].format("DD.MM.Y") + " - " + dates[5].format("DD.MM.Y"));

    $(".main_block").slideDown(1000);

    $.each($("table.menu"), function (key, table) {
        $(table).append("<caption>" + dates[key].locale('ru').format('D MMMM Y г. ') + "</caption>");

        $.ajax({
            url:"/script/php/select.php",
            type:"post",
            dataType:"json",
            data:{
                tableName: "MENU_LIST",
                Date:dates[key].format("Y-MM-DD")
            },

            success: function (res) {
                if(res.length == 0)
                    MenuAdderCreator(table);
                else {

                    MenuCreator(table, res[0]["Menu_ID"]);


                    let data = {
                        subTable:subTables[0],
                        parent:{
                            fieldName: "Menu_ID",
                            fieldId: res[0]["Menu_ID"]
                        }
                    };


                    $.post(
                        "/script/php/subSelect.php",
                        data,
                        function (res) {
                            SubTableCreator($("#w-"+key), res, data, "58px");

                        },
                        "json"
                    )
                        .fail(function () {
                            ThrowNotice($("#ajaxError"), "Ошибка чтения меню на " + dates[key].format("DD.MM.Y"));
                        });
                }
            },

            error: function () {
                ThrowNotice($("#ajaxError"), "Ошибка чтения списка меню (" + dates[key].format("DD.MM.Y") +")");
            }
        })
    });
};


var MenuAddHandler = function (buttonHolder) {
    let date = dates[buttonHolder.parent().parent().parent().attr("id").split("-")[1]];
    $.post("/script/php/select.php", {tableName: "MENU_LIST"}, "JSON")
        .done(function (res) {
            let newID = 0;
            $.each(JSON.parse(res), function (key, val) {
                newID = (newID < val["Menu_ID"])? val["Menu_ID"] : newID;
            });
            ++newID;
            let data = {
                id:newID,
                tableMark:tableData.tableMark,
                Date:date.format("Y-MM-DD")
            };
            $.ajax({
                type: "POST",
                url: "/script/php/add.php",
                data: data,

                success: function (result) {
                    if(result) {
                        let currentTable = buttonHolder.parent().parent().html("");
                        currentTable.append("<caption>" + date.locale('ru').format('D MMMM Y г. ') + "</caption>");

                        MenuCreator(currentTable, newID);

                        let DoT = {
                            subTable:subTables[0],
                            parent:{
                                fieldName: "Menu_ID",
                                fieldId: newID
                            }
                        };
                        currentTable.parent().slideUp(0);
                        SubTableCreator(currentTable.parent(), {}, DoT, "58px");
                        currentTable.parent().slideDown(300);
                    }
                    else
                        ThrowNotice($("#sqlError"), "Данное меню уже существует");
                },
                error: function () {
                    ThrowNotice($("#ajaxError"), "Ошибка создания меню (" + date.format("DD.MM.Y") + ")");
                }
            });
        })
        .fail(function () {
            ThrowNotice($("#ajaxError"), "Ошибка чтения списка меню (*)");
        });

};


var MenuDeleteHandler = function (buttonHolder) {
    let date = dates[buttonHolder.parent().parent().parent().attr("id").split("-")[1]];
    let menuID = buttonHolder.parent().parent().attr("id").split("-")[1];
    let data = {
        id:menuID,
        tableMark:tableData.tableMark,
    };

    $.ajax({
        type: "POST",
        url: "/script/php/delete.php",
        data: data,

        success: function (result) {
            if(result)
            {
                let currentTable = buttonHolder.parent().parent().html("");
                $(currentTable).append("<caption>" + date.locale('ru').format('D MMMM Y г. ') + "</caption>");
                MenuAdderCreator(currentTable);
            }
            else
                ThrowNotice($("#sqlError"), "Ошибка при удалении меню (" + date.locale('ru').format('DD.MM.Y') + ")");
        },
        error: function () {
            ThrowNotice($("#ajaxError"), "Ошибка удаления меню (" + date.locale('ru').format('DD.MM.Y') + ")");
        }
    });

};


var MenuReplaceHandler = function (input){
    let currentDate = dates[input.parent().parent().parent().attr("id").split("-")[1]].format("D MMMM Y г. ");
    let data = {
        id:input.parent().parent().attr("id").split("-")[1],
        tableMark:tableData.tableMark,
        Date:input.val()
    };

    $.ajax({
        type: "POST",
        url: "/script/php/edit.php",
        data: data,

        success: function (result) {
            if(result) {
                let currentTable = input.parent().parent();
                let cut = currentTable.children("tr").detach();
                let menuID = currentTable.attr("id").split("-")[1];
                currentTable.html("");
                currentTable.append("<caption>" + currentDate + "</caption>");
                MenuAdderCreator(currentTable);




                $.each(dates, function (key, date) {
                    if(date.format("Y-MM-DD") == data.Date)
                    {
                        $("#w-"+key).slideUp(0);
                        let newTable = $("#w-"+key).children("table");
                        newTable.html("");
                        newTable.append("<caption>" + date.format("D MMMM Y г. ") + "</caption>");
                        MenuCreator(newTable, menuID);
                        newTable.append(cut);
                        $("#w-"+key).slideDown(500);
                    }
                });
            }
            else
                ThrowNotice($("#sqlError"), "Указанная дата уже занята");
        },
        error: function () {
            ThrowNotice($("#ajaxError"), "Ошибка перемещения меню (" + data.Date.format("DD.MM.Y") + ")");
        }
    });
};




var MenuAdderCreator = function (table) {
    $(table).removeAttr("id");
    $(table).children("caption")
        .append($("<button class='table add'> Новое меню </button>")
            .css("margin-right", "33px")
            .button({icon: "ui-icon-plusthick", showLabel: false})
            .click(function () {
                MenuAddHandler($(this));
            })
        );
};


var MenuCreator = function(table, menuID){
    $(table).attr("id", "menu-"+menuID);
    $(table).children("caption")
        .append($("<input>", {
                type: 'text',
                name: 'replaceCalendar',
                css: {
                    display: 'none'
                }
            })
                .datepicker({
                    dateFormat:"yy-mm-dd",
                    onSelect:function() {
                        $("#confirmMenuReplace").data("menuInputHolder", $(this));
                        $("#confirmMenuReplace").dialog("open");
                    }
                })
        );


    $(table).children("caption")
        .append($("<button class='table edit'> Переместить </button>")
            .css("margin-right", "5px")
            .button({icon: "ui-icon-calendar", showLabel: false})
            .click(function () {
                $(this).parent().children("input").datepicker("show");
            })
        );

    $(table).children("caption")
        .append($("<button class='table delete'> Удалить </button>")
            .button({icon: "ui-icon-trash", showLabel: false})
            .click(function () {
                $("#confirmMenu").data("menuButtonHolder", $(this));
                $("#confirmMenu").dialog("open");
            })
        );
};


$("#confirmMenu").dialog({
    modal:true,
    autoOpen:false,
    closeText:"Закрыть",
    width:"auto",
    height:"auto",
    buttons:{
        Да:function () {
            MenuDeleteHandler($(this).data("menuButtonHolder"));
            $(this).dialog("close");
        },
        Нет:function () {
            $(this).dialog("close");
        }
    }
});


$("#confirmMenuReplace").dialog({
    modal:true,
    autoOpen:false,
    closeText:"Закрыть",
    width:"auto",
    height:"auto",
    buttons:{
        Да:function () {
            MenuReplaceHandler($(this).data("menuInputHolder"));
            $(this).data("menuInputHolder", null);
            $(this).dialog("close");
        },
        Нет:function () {
            $(this).dialog("close");
        }
    }
});



$("#calendar").datepicker("setDate", "+7d");
MenuHandler("#calendar");