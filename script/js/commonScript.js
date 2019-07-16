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



//функция создания элемента формы
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



var CollMarker = function(buttonSelector, mark, toRemove = false){
    let coll = $("#mptable tr #"+$(buttonSelector).parent().attr("id"));
    toRemove ? coll.removeClass(mark) : coll.addClass(mark);
};



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