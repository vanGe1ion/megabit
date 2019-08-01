var frees = [];


$(".monitorMain").height($(".pageContent").height() - $("header").height()  - $("nav").height());
$(".orderClose").button("disable").removeAttr("id");


//привязка обработчиков
$(".queueButton").click(function () {
    QueueButtonHandler(this)
});




//инициализация монитора
var MonitorInit = function(){
    AjaxWaiter(200);

    //создание таблицы заказа по типу блюд
    $.post(
        "/script/php/Select.php",
        {
            queryName: "SelectDishTypeList",
            queryData:{}
        },
        function (res) {
            if(res.length){
                $.each(res, function (fieldKey, field) {
                    $(".orderData").append($("<div class='dishTypeRow' id='dishType-" + field.Dish_Type_ID + "'/>")
                        .hide()
                        .append($("<div class='dishType'/>")
                            .text(field.Dish_Type_Name))
                        .append($("<div class='orderDishes'/>"))
                    );
                });


                // чтение id бесплатных блюд
                $.post(
                    "/script/php/Select.php",
                    {
                        queryName: "SelectDishFree",
                        queryData:{
                            Date: moment().format("Y-MM-DD")
                        }
                    },
                    function (res) {
                        $.each(res, function (fieldKey, field) {
                            frees.push(+field["Dish_ID"]);
                        });


                        $(".monitorSideBar").children().eq(0).click();
                        StartMonitoring(QUEUE_LISTENING_INTERVAL);

                    },
                    "json")
                    .fail(function () {
                        ThrowNotice("Error", "Ошибка", "ajax",
                            "Ошибка инициализации монитора (DishFree)");
                    });
            }
        },
        "json")
        .fail(function () {
            ThrowNotice("Error", "Ошибка", "ajax",
                "Ошибка инициализации монитора (DishType)");
        });
};

//функция мониторинга очереди в реальном времени
var StartMonitoring = function (listenInterval) {
    setInterval(function () {
        $.ajax({
            url: "/script/php/Select.php",
            type: "post",
            dataType: "json",
            data: {
                queryName: TableData.querySet.read,
                queryData: {
                    lastElem: $(".monitorSideBar button:last").length > 0 ? +$(".monitorSideBar button:last").attr("id").split("-")[1] : 0,
                    Date: moment().format("Y-MM-DD")
                }
            },

            success: function (res) {
                let wasEmpty = $(".monitorSideBar").children().length == 0 ? 1 : 0;
                $.each(res, function (key, row) {
                    $(".monitorSideBar").append($("<button class='queueButton' id='qElem-" + row.Elem_ID + "' />")
                        .button()
                        .append($("<div style='margin-left: 8px;'/>").text(row.Order_ID))
                        .append(".")
                        .append($("<div class='queueButtonLabel' id='empID-" + row.Emp_ID + "'/>").text(row.Fullname))
                        .hide()
                        .click(function () {
                            QueueButtonHandler(this)
                        })
                    );
                });
                $(".queueButton").show(300);
                if(wasEmpty)
                    $(".monitorSideBar").children(":first").click();
            },
            error: function () {
                ThrowNotice("Error", "Ошибка", "ajax",
                    "Ошибка чтения заказа на " + moment().format("DD.MM.Y") + " (EmpID: " + data.queryData.EmpID + ")");
            }
        });
    }, listenInterval)
};




//обработчик элемента очереди
var QueueButtonHandler = function(buttonSelector){
    let orderID = $(buttonSelector).children(":first").text();
    let queueID = $(buttonSelector).attr("id").split("-")[1];

    CleanScreen();

    let data = {
        queryName: "SelectEmployer",
        queryData:{
            EmpID: $(buttonSelector).children(".queueButtonLabel").attr("id").split("-")[1]
        }
    };

    //чтение данных работника
    $.ajax({
        url: "/script/php/Select.php",
        type: "post",
        dataType: "json",
        data: data,

        success: function (res) {
            if (res.length){
                let employee = res[0];
                $(".Fullname").text(employee.Fullname);
                $("#Department").text(employee.Department_Name);
                $("#Position").text(employee.Position_Name);
                $("#Table").text(employee.Table_Name);
                $("#Shift").text(employee.Shift_Name);
            }
            else
                ThrowNotice("Warning", "Предупреждение", "mySql",
                    "Ошибка! Пользователь не обнаружен (EmpID: " + data.queryData.EmpID + ")");
        },
        error: function () {
            ThrowNotice("Error", "Ошибка", "ajax",
                "Ошибка чтения данных пользователя (EmpID: " + data.queryData.EmpID + ")");
        }
    });

    data = {
        queryName: "SelectOrderMenu",
        queryData:{
            parent: $(buttonSelector).children().eq(0).text()
        }
    };

    //чтение данных заказа
    $.ajax({
        url: "/script/php/Select.php",
        type: "post",
        dataType: "json",
        data: data,

        success: function (res) {
            if (res.length){
                let sum = 0;
                $.each(res, function (key, row) {
                    let curRow = $("#dishType-" + row.Dish_Type_ID).show();
                    curRow.children(".orderDishes").append($("<div class='dishOfOrder' id='dish-" + row.Dish_ID + "'/>")
                        .append($("<span class='dishLabel'>Блюдо:</span>" ))
                        .append($("<span class='dishName'>" + row.Dish_Name + "</span>" ))
                        .append($("<span class='dishLabel'>Кол-во:</span>" ))
                        .append($("<span class='dishCount'>" + row.Count + "</span>" ))
                    );

                    sum += +row.Price * +row.Count - ($.inArray(+row.Dish_ID, frees) >= 0 ? +row.Price : 0);
                });

                $("#sum").text(sum + " руб.");
            }
            else
                $(".orderData").prepend($("<h1 id='empty' align='center'>Заказ пуст</h1>"));

            $(".orderClose").button("enable").attr("id", "queueOrder-"+queueID+"-"+orderID).click(function () {OrderCloseButtonHandler(this)});
        },
        error: function () {
            ThrowNotice("Error", "Ошибка", "ajax",
                "Ошибка чтения заказа на " + moment().format("DD.MM.Y") + " (OrderID: " + data.queryData.parent + ")");
        }
    });
};

//обработчик закрытия заказа
var OrderCloseButtonHandler = function (buttonSelector) {
    let queueID = $(buttonSelector).attr("id").split("-")[1];
    let orderID = $(buttonSelector).attr("id").split("-")[2];
    let expand = TableData.expands[0]["Заказ"];

    //удаление заказа
    $.ajax({
        url: "/script/php/ajaxOperator.php",
        type: "post",
        dataType: "json",
        data: {
            queryName: expand.querySet.delete,
            queryData:{
                id: orderID
            }
        },

        success: function (res) {
            if (res){

                CleanScreen();

                //удаление элемента очереди
                $.ajax({
                    url: "/script/php/ajaxOperator.php",
                    type: "post",
                    dataType: "json",
                    data: {
                        queryName: TableData.querySet.delete,
                        queryData:{
                            id: queueID
                        }
                    },

                    success: function (res) {
                        if (res) {
                            $(".queueButton#qElem-" + queueID).hide(300, function () {
                                $(this).next().click();
                                $(this).remove();
                            });
                        }
                        else
                            ThrowNotice("Warning", "Предупреждение", "mySql",
                                "Не возможно удалить элемент очереди (qElem: " + queueID + ")");
                    },
                    error: function () {
                        ThrowNotice("Error", "Ошибка", "ajax",
                            "Ошибка удаления элемента очереди (qElem: " + queueID + ")");
                    }
                });
            }
            else
                ThrowNotice("Warning", "Предупреждение", "mySql",
                    "Не возможно закрыть заказ на " + moment().format("DD.MM.Y") + " (OrderID: " + orderID + ")");
        },
        error: function () {
            ThrowNotice("Error", "Ошибка", "ajax",
                "Ошибка закрытия заказа на " + moment().format("DD.MM.Y") + " (OrderID: " + orderID + ")");
        }
    });
};




//очистка монитора
var CleanScreen = function(){
    $(".Fullname, .empData span, .orderDishes, #sum").text("");
    $(".dishTypeRow").hide();
    $(".orderClose").button("disable").removeAttr("id");
    $(".orderData #empty").remove();
};




MonitorInit();