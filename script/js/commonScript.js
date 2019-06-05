$("button").button();
$("div.content").height($("body").height()-$("footer").height())
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

    $("div.content").css("height", 0); //я хз как это сработало, но сработало
    $(notice).appendTo(containerSelector).fadeIn(800).fadeTo(5000, 1.0, function (){
        $(this).fadeOut(800, function () {
            $("div.content").css("height", $("body").height()-$("footer").height());
            $(this).remove()
        })
    });
};

//вызывает диалоговое окно
var ThrowDialog = function(containerSelector, title, text, func, buttonSelector = null){                                    //todo bs

    let dialog = $("<div />", {
        title:title,
        class: "hidden"
    })
        .append($("<p />", {
            html: text
        }));
    $(dialog).data("buttonSelector", buttonSelector);

    $(dialog).appendTo(containerSelector).dialog({
        modal:true,
        autoOpen:false,
        closeText:"Закрыть",
        width:400,
        height:"auto",
        buttons:{
            Да:function (){
                func($(this).data("buttonSelector"));
                $(this).dialog("close").dialog("destroy").remove();
            },
            Нет:function () {
                $(this).dialog("close").dialog("destroy").remove();
            }
        }
    })
        .dialog("open");
};

//функция создания элемента формы
var FormElemCreator = function(elemType, elemId, width, value) {
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
            $.ajax({
                type: "POST",
                dataType:"json",
                url: "/script/php/selectFieldData.php",
                data: {select_id:elemId},

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

//создает пул данных запросов для таблиц бд
var CreateDataPool = function (dataPool, tableData) {
    dataPool[tableData.tempData] = {
        create: {},
        update: {},
        delete: {},
        olds: {}
    };
    if(tableData.expands)
        $.each(tableData.expands, function (key, expand) {
            $.each(expand, function (label, table) {
                CreateDataPool(dataPool, table)
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