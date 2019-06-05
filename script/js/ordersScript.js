var dates = [];
var orderTableData = subTables[0];


$("#calendar").css("text-align", "center").datepicker({
    dateFormat:"dd.mm.yy",
    onSelect:function (){
        $("#order_accord").slideUp(0);
        OrderHandler(this)
    }
});



var OrderHandler = function(selector){
    $.each($("table.menu"), function (key, table) {
        $(table).html("");
        $(table).parent().prev().children("a").html("");
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

    $.each($("table.menu"), function (key, table) {
        $(table).parent().prev().children("a").html(dates[key].locale('ru').format("dddd, D MMMM Y г."));
        // $.post(
        //     "/script/php/select.php",
        //     type:"post",
        //     dataType:"json",
        //     data:{
        //         tableName: "MENU_LIST",
        //         Date:dates[key].format("Y-MM-DD")
        //     },
        //
        //     success: function (res) {
        //
        //     }
        // );


        $.ajax({
            url:"/script/php/select.php",
            type:"post",
            dataType:"json",
            data:{
                tableName: "ORDER_LIST",
                Date:dates[key].format("Y-MM-DD"),
                Employee_ID: empID
            },

            success: function (res) {
                if(res.length == 0)
                    OrderAdderCreator(table);
                else {
                    OrderCreator(table, res[0]["Order_ID"]);

                    $.post(
                        "/script/php/selectOrder.php",
                        {
                            empID:empID,
                            date:dates[key].format("Y-MM-DD"),
                        },
                        function (res) {
                            let data = {
                                subTable:orderTableData,
                                parent:{
                                    fieldName: "Order_ID",
                                    fieldId: res[0]["Order_ID"]
                                }
                            };
                            TableCreator(table, res, data);
                        },
                        "json"
                    )
                        .fail(function () {
                            ThrowNotice($("#ajaxError"), "Ошибка чтения заказа на " + dates[key].format("DD.MM.Y"));
                        });
                }
            },

            error: function () {
                ThrowNotice($("#ajaxError"), "Ошибка чтения списка заказов (" + dates[key].format("DD.MM.Y") +")");
            }
        })
    });


    $("#order_accord").slideDown(1000);
    $("#order_accord").accordion({autoHeight:false});
    $(".day_order").css("height","auto");
};


var OrderAdderCreator = function (table) {
    $(table).removeAttr("id");
    $(table).append($("<caption />")
        .append($("<button class='table add'> Новый заказ </button>")
            .button({icon: "ui-icon-plusthick", showLabel: true})
            .removeClass("ui-widget")
            .click(function () {
                OrderAddHandler($(this));
            })
        )
    )
};


var OrderAddHandler = function (buttonHolder) {
    let date = dates[buttonHolder.parent().parent().parent().prev().children("a").attr("id").split("-")[1]];
    $.post("/script/php/select.php", {tableName: "ORDER_LIST"}, "JSON")
        .done(function (res) {
            let newID = 0;
            $.each(JSON.parse(res), function (key, val) {
                newID = (newID < val["Order_ID"])? val["Order_ID"] : newID;
            });
            ++newID;
            let data = {
                id:newID,
                tableMark:tableMark,
                Employee_ID:empID,
                Date:date.format("Y-MM-DD")
            };
            $.ajax({
                type: "POST",
                url: "/script/php/add.php",
                data: data,

                success: function (result) {
                    if(result) {
                        console.log("added");
                        let currentTable = buttonHolder.parent().parent().html("");

                        OrderCreator(currentTable, newID);

                        let DoT = {
                            subTable:orderTableData,
                            parent:{
                                fieldName: "Order_ID",
                                fieldId: newID
                            }
                        };
                        //SubTableCreator(currentTable.parent(), {}, DoT, "68px");
                    }
                    else
                        ThrowNotice($("#sqlError"), "Данный заказ уже существует");
                },
                error: function () {
                    ThrowNotice($("#ajaxError"), "Ошибка создания заказа (" + date.format("DD.MM.Y") + ")");
                }
            });
        })
        .fail(function () {
            ThrowNotice($("#ajaxError"), "Ошибка чтения списка заказов (*)");
        });

};


var OrderCreator = function(table, orderID){
    $(table).attr("id", "order-"+orderID);

    $(table).append($("<caption />")
        .append($("<button class='table delete'> Удалить заказ </button>")
            .button({icon: "ui-icon-trash", showLabel: true})
            .removeClass("ui-widget")
            .click(function () {
                $("#confirmOrder").data("orderButtonHolder", $(this));
                $("#confirmOrder").dialog("open");
            })
        )
    )
};



var OrderDeleteHandler = function (buttonHolder) {
    let date = dates[buttonHolder.parent().parent().parent().prev().children("a").attr("id").split("-")[1]];
    let orderID = buttonHolder.parent().parent().attr("id").split("-")[1];
    let data = {
        id:orderID,
        tableMark:tableMark,
    };

    $.ajax({
        type: "POST",
        url: "/script/php/delete.php",
        data: data,

        success: function (result) {
            if(result)
            {
                let currentTable = buttonHolder.parent().parent().html("");
                OrderAdderCreator(currentTable);
            }
            else
                ThrowNotice($("#sqlError"), "Ошибка при удалении заказа (" + date.locale('ru').format('DD.MM.Y') + ")");
        },
        error: function () {
            ThrowNotice($("#ajaxError"), "Ошибка удаления заказа (" + date.locale('ru').format('DD.MM.Y') + ")");
        }
    });

};


$("#confirmOrder").dialog({
    modal:true,
    autoOpen:false,
    closeText:"Закрыть",
    width:"auto",
    height:"auto",
    buttons:{
        Да:function () {
            OrderDeleteHandler($(this).data("orderButtonHolder"));
            $(this).dialog("close");
        },
        Нет:function () {
            $(this).dialog("close");
        }
    }
});



$("#calendar").datepicker("setDate", "+1d");
OrderHandler("#calendar");