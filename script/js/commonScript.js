$("button").button();
$("div.pageContent").height($("body").height()-$("div.pageFooter").height())
    .css("min-height", $("header").height() + $("nav").height());




//проверка существования переменной
var isset = function (variable) {
    if(typeof(variable) == "undefined" || variable == null)
        return false;
    return true;
};




//вызывает оповещение
var ThrowNotice = function (messageType, title, noticer, message, containerSelector = "#notices") {

    let notice = $("<div />", {
        title: title,
        class: "ui-widget ui-corner-all",
        align:"left",
        css:{
            display: "none",
            width: "90%",
        }
    })
        .append($("<p />")
            .append($("<span />", {
                class: "ui-icon notice_icon",
                css:{
                    zoom: "1.2"
                }
            }))
            .append($("<strong />", {
                text: noticer + messageType + ": "
            }))
            .append($("<span />", {
                class: "noticeText",
                html: message
            }))
        );

    let icon, noticeClass;

    switch (messageType) {
        case "Error": {
            noticeClass = "ui-state-error";
            icon = "ui-icon-circle-close";
            break;
        }
        case "Warning": {
            noticeClass = "ui-state-highlight";
            icon = "ui-icon-alert";
            break;
        }
        default:{
            noticeClass = "ui-state-hover";
            icon = "ui-icon-info";
            break;
        }
    }

    notice.addClass(noticeClass);
    notice.children().children(".ui-icon").addClass(icon);

    $("div.pageContent").css("height", 0); //я хз как это сработало, но сработало
    $(notice).appendTo(containerSelector).fadeIn(800).fadeTo(5000, 1.0, function (){
        $(this).fadeOut(800, function () {
            $("div.pageContent").css("height", $("body").height()-$("div.pageFooter").height());
            $(this).remove()
        })
    });
    console.log(noticer + messageType + ": " + message);
};

//вызывает диалоговое окно
var ThrowDialog = function(title, text, callbackYes, callbackNo = null, containerSelector = "#dialogs"){

    let dialog = $("<div />", {
        title:title,
        class: "hidden"
    })
        .append($("<p />", {
            html: text
        }));

    $(dialog).appendTo(containerSelector).dialog({
        modal:true,
        autoOpen:false,
        closeText:"Закрыть",
        width:400,
        height:"auto",
        buttons:{
            Да:function (){
                callbackYes();
                $(this).dialog("close").dialog("destroy").remove();
            },
            Нет:function () {
                if (callbackNo)
                    callbackNo();
                $(this).dialog("close").dialog("destroy").remove();
            }
        }
    })
        .dialog("open");
};




//создает пул данных запросов для таблиц бд
var DataPoolCreator = function (dataPool, tableData) {
    dataPool[tableData.poolName] = {
        create: {},
        update: {},
        delete: {},
        olds: {}
    };
    if(tableData.expands)
        $.each(tableData.expands, function (key, expand) {
            $.each(expand, function (label, table) {
                DataPoolCreator(dataPool, table)
            });
        });
};

//выполняет запросы к базе с данными пула, удаляет из него отработанные данные
var DataPoolRequester = function(dataPool, tableData, mainDomCallback, expDomCallback, expNum = null){
    let currentPool = JSON.parse(JSON.stringify(dataPool[tableData.poolName]));
    delete(currentPool.olds);



    $.each(currentPool, function (levelName, level) {
        if(expNum == null) {
            $.each(level, function (id, field) {
                let data = {
                    queryName: tableData.querySet[levelName],
                    queryData: field
                };
                $.ajax({
                    url:"/script/php/ajaxOperator.php",
                    type:"post",
                    data:data,
                    success:function (res) {
                        if(res){
                            //pool
                            PoolDataRemover(dataPool[tableData.poolName], levelName, null, id);
                            if(levelName == "update")
                                PoolDataRemover(dataPool[tableData.poolName], "olds", null, id);
                            //dom
                            let cbData = {
                                levelName:levelName,
                                id:id
                            };
                            mainDomCallback(cbData);
                        }
                        else
                            ThrowNotice("Warning", "Результат запроса: Ошибка!", "sql",
                                "Отклонен запрос для " + tableData.poolName + "." + levelName + " (id " + id + ")");
                    },
                    error:function () {
                        ThrowNotice("Error", "Ошибка!", "ajax",
                            "Ошибка выполнения запроса для " + tableData.poolName + "." + levelName + " (id: " + id + ")");
                    }
                })
            });
        }
        else {
            $.each(level, function (parent, fields) {
                $.each(fields, function (id, field) {
                    let data = {
                        queryName: tableData.querySet[levelName],
                        queryData: {
                            parent:parent,
                            field:field
                        }
                    };
                    $.ajax({
                        url: "/script/php/ajaxOperator.php",
                        type: "post",
                        data: data,
                        success: function (res) {
                            if(res) {
                                //pool
                                PoolDataRemover(dataPool[tableData.poolName], levelName, parent, id);
                                if(levelName == "update")
                                    PoolDataRemover(dataPool[tableData.poolName], "olds", parent, id);
                                //dom
                                let cbData = {
                                    levelName:levelName,
                                    parent:parent,
                                    id:id,

                                    poolName:tableData.poolName,
                                    expNum:expNum
                                };
                                expDomCallback(cbData);
                            }
                            else
                                ThrowNotice("Warning", "Результат запроса: Ошибка!", "sql",
                                    "Отклонен запрос для " + tableData.poolName + "." + levelName + " (parent: " + parent + ", id: " + id + ")");
                        },
                        error:function () {
                            ThrowNotice("Error", "Ошибка!", "ajax",
                                "Ошибка выполнения запроса для " + tableData.poolName + "." + levelName + " (parent: " + parent + ", id: " + id + ")");
                        }
                    })
                });
            });
        }
    });



    // let warningText = "";                                                                                                //todo
    // $.each(currentPool, function (levelName, level) {
    //     if(Object.keys(level).length) {
    //         warningText += tableData.poolName + "." + levelName + ":<br>";
    //         if(expNum == null)
    //             $.each(level, function (id, field) {
    //                 warningText += "id: " + id + "<br>";
    //             });
    //         else{
    //             $.each(level, function (parent, fields) {
    //                 $.each(fields, function (id, field) {
    //                     warningText += "parent: " + parent + ", id: " + id + "<br>";
    //                 });
    //             });
    //         }
    //         warningText += "<br>";
    //     }
    // });

    if(tableData.expands)
        $.each(tableData.expands, function (key, expand) {
            $.each(expand, function (label, table) {
                DataPoolRequester(dataPool, table, mainDomCallback, expDomCallback, key)
            });
        });
};

//добавляет данные в пул (если родитель нуль - работает с одноключевыми таблицами)
var PoolDataInserter = function (pool, level, parent, id, data) {
    if(parent) {
        if (!isset(pool[level][parent]))
            pool[level][parent] = {};
        pool[level][parent][id] = data;
    }
    else
        pool[level][id] = data;
};

//удаляет данные из пула (если родитель нуль - работает с одноключевыми таблицами, если айди нуль -
//то удалет все записи родителя, если указан и родитель и айди - удаляет конкретную запись родителя)
var PoolDataRemover = function (pool, level, parent, id) {
    if(parent) {
        if(id){
            delete (pool[level][parent][id]);
            if (!Object.keys(pool[level][parent]).length)
                delete (pool[level][parent]);
        }
        else
            delete (pool[level][parent]);
    }
    else
        delete (pool[level][id]);
};




//маркер столцоы
var CollMarker = function(buttonSelector, mark, toRemove = false){
    let coll = $("#mptable tr #"+$(buttonSelector).parent().attr("id"));
    toRemove ? coll.removeClass(mark) : coll.addClass(mark);
};

//создание панели редактирования
var EditPanelCreator = function () {
    $("div.pageFooter").prepend($("<div />", {
            align:"center",
            css:{
                margin: "10px 0"
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
};

//функция вывода диалога ожидания при запросах
var AjaxWaiter = function (fadeTime, RequestFinaleHandler = null) {
    $(document).bind("ajaxStart", function () {
        $(".wait-box, .overlay").fadeIn(fadeTime);
    });
    $(document).bind("ajaxStop", function () {
        $(".wait-box, .overlay").fadeOut(fadeTime);
        if(RequestFinaleHandler != null)
            RequestFinaleHandler();
        $(this).unbind();
    });
};




