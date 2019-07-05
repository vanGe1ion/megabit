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
var ThrowNotice = function (containerSelector, messageType, title, noticer, message) {

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
var ThrowDialog = function(containerSelector, title, text, callbackYes, callbackNo = null){

    let answer = null;
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
                            ThrowNotice("#notices", "Warning", "Результат запроса: Ошибка!", "sql",
                                "Отклонен запрос для " + tableData.poolName + "." + levelName + " (id " + id + ")");
                    },
                    error:function () {
                        ThrowNotice("#notices", "Error", "Ошибка!", "ajax",
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
                                ThrowNotice("#notices", "Warning", "Результат запроса: Ошибка!", "sql",
                                    "Отклонен запрос для " + tableData.poolName + "." + levelName + " (parent: " + parent + ", id: " + id + ")");
                        },
                        error:function () {
                            ThrowNotice("#notices", "Error", "Ошибка!", "ajax",
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



//функция создания элемента формы
var FormElemCreator = function(elemType, elemId, width, value, selSubID = null) {
    let newElem;
    switch (elemType) {
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
                    ThrowNotice("#notices", "Error", "Ошибка!", "ajax","Ошибка создания элемента (SelectField)");
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
                    width:width,
                    minWidth: 40
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



var CollMarker = function(buttonSelector, mark, isRemove = false){
    let coll = $("#mptable tr #"+$(buttonSelector).parent().attr("id"));
    isRemove ? coll.removeClass(mark) : coll.addClass(mark);
};



var EditPanelCreator = function () {
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
};