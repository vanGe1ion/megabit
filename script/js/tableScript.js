//$(document).ready(function () {

    //проверка пустых полей
    var notEmpty = function(row, tableData = null){
        let errText = "";
        let iterator = 2;
        let form = tableForm;
        if(isset(tableData)){
            iterator = 1;
            form = tableData.subTable.tableForm;
        }


        $.each(form, function( name, type ) {
            if (row.children().children("#"+name).val() == "") {
                let inpName = row.parent().children("#headRow").children("#c-"+iterator).text();
                errText += inpName + "<br>";
            }
            ++iterator;
        });

        if (errText == '')
            return true;
        else {
            $("#empf").html(errText);
            $("#isEmpty").dialog("open");
            return false;
        }
    };


    //функция взытия данных из инпутов для отправки в запросе

    function SendDataCreator(rowHolder, rowId, tableData = null, red = false) {
        let currentForm = tableForm;
        let currentTmark = tableMark;
        let currentId = rowId;
        let data = {};


        if(isset(tableData))
        {
            currentForm = {};
            $.each(tableData.subTable.tableForm, function (key, val) {
                currentForm[key] = val;
            });
            currentTmark = tableData.subTable.tableMark;
            currentId = tableData.parent.fieldId;
            if(red){
                data[Object.keys(currentForm)[0]] = (rowHolder.attr("id")).split("-")[1];
                delete(currentForm[Object.keys(currentForm)[0]]);
            }
        }

        data.id=currentId;
        data.tableMark=currentTmark;

        $.each(currentForm, function (name) {
            data[name] = rowHolder.children().children("#" + name).val();
        });

        return data;
    }



    //создает из указанной строки стандартную табличную запись с указанным набором данных
    function RowCreator(rowHolder, data, tableData = null, red = false) {
        rowHolder.html("");
        let iterator = 1;
        delete (data.tableMark);
        if(isset(tableData)) {
            delete (data.id);
            if(red)
                delete (data.subId);
        }
        let selects=[];
        $.each(data, function( id, val ) {
            if (id.substr(-2) != "ID" || !isNumeric(val))
                rowHolder.append("<td class='db' id='c-" + iterator + "'>"+val+"</td>");
             else
            {
                rowHolder.append("<td class='db' id='c-" + iterator + "'></td>");
                selects.push( new Object({iter:iterator, myid:id, myval:val}));
            }
            ++iterator;
        });



        $.each(selects, function(key, value) {
            (async function(){
                let mySelect =  await $.post("/script/php/selectFieldData.php", {select_id: value.myid}, "json")
                    .fail(function (){Notificator($("#ajaxError"), "Ошибка формирования значения элемента (SelectField)")});
                return await JSON.parse(mySelect);
            })().then(function (result) {
                rowHolder.children("#c-" + value.iter).text(result[value.myval]);
            });
        });



        rowHolder.append("<td class='db' id='c-"+iterator+"'></td>");


        if(subButtons.length != 0 && tableData == null)
            $.each(subButtons, function (key, value) {
            rowHolder.children().last().append("<button class='table expand' id='sub-"+key+"'>"+value+"</button> ")
        });
        rowHolder.children().children(".expand").button({icons: {secondary:"ui-icon-document"}, showLabel: true});
        rowHolder.children().children(".expand").bind("click", function(){expandHandler(this, tableData)});


        rowHolder.children().last().append("<button class='table edit'>Редактировать</button> <button class='table delete'>Удалть</button>");
        rowHolder.children().children(".edit").bind("click", function(){editHandler(this, tableData)});
        rowHolder.children().children(".edit").button({icon: "ui-icon-pencil", showLabel: false});
        rowHolder.children().children(".delete").bind("click", function(){
            $("#confirm").data("buttonHolder", $(this));
            $("#confirm").data("subTable", tableData);
            $("#confirm").dialog("open");
        });
        rowHolder.children().children(".delete").button({icon: "ui-icon-trash", showLabel: false});
    }




    var FormElemCreator = function (elemType, elemId, width, value) {
        let newElem;
        switch (elemType) {
            case "select": {
                newElem = $("<select>", {
                    name:elemId,
                    id:elemId,
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
                        Notificator($("#ajaxError"), "Ошибка создания элемента (SelectField)");
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
                    min:0,
                    css:{
                        width:width,
                    }
                });
            }
        }
        return newElem;
    };




    //создание заполняемой формы
    var FormCreator = function (rowHolder, data, tableData = null, red = false) {

        let iterator = 2;
        let currentForm = tableForm;
        let newRow = data.id;

        if(isset(tableData))
        {
            iterator = 1;
            currentForm = {};
            $.each(tableData.subTable.tableForm, function (key, val) {
                currentForm[key] = val;
            });
            newRow = tableData.parent.fieldId;
            if(red)
            {
                iterator = 2;
                rowHolder.html("<td class='db' id='c-1'>"+data[Object.keys(currentForm)[0]]+"</td>");
                delete(currentForm[Object.keys(currentForm)[0]]);
            }
        }
        else
            rowHolder.html("<td class='db' id='c-1'>"+newRow+"</td>");



        $.each(currentForm, function( id, type ) {
            let newCell = $("<td class='db' id='c-"+iterator+"'></td>");
            let inpWidth = rowHolder.siblings().first().children("#c-"+iterator).css("width");
            let inpValue = isset(data[id])?data[id]:"";                                                             //todo edit sub
            let newElem = FormElemCreator(type, id, inpWidth, inpValue);
            newCell.append(newElem);
            rowHolder.append(newCell);
            ++iterator;
        });
        rowHolder.append(
            "<td class='db' id='c-"+iterator+"' style='text-align: left'>" +
            "<button class='table save'>Сохранить</button> " +
            "<button class='table cancel'>Отмена</button>" +
            "</td>"
        );
        rowHolder.children().children(".save").button({icon: "ui-icon-disk", showLabel: false});
        rowHolder.children().children(".cancel").button({icon: "ui-icon-cancel", showLabel: false});
    };
    


    //присваиваемы функции основных табличных кнопок
    var deleteHandler = function (buttonHolder, tableData = null) {
        let currow = ($(buttonHolder).parent()).parent();
        let rownum = (currow.attr('id')).split('-')[1];
        let data = {
            tableMark:tableMark,
            id: rownum
        };
        if(isset(tableData)){
            data = {
                tableMark:tableData.subTable.tableMark,
                id: tableData.parent.fieldId,
            };
            let subId = new Object({});
            subId[Object.keys(tableData.subTable.tableForm)[0]] = rownum;
            data.subId = subId;
        }

        $.ajax({
            type: "POST",
            url: "/script/php/delete.php",
            data: data,
            success: function (result) {
                if(result)
                    currow.remove("#" + currow.attr("id"));
                else
                    Notificator($("#sqlError"), "Ошибка при удалении записи");
            },
            beforeSend: function (){
                return $("#confirm").dialog("open");
            },
            error: function () {
                Notificator($("#ajaxError"), "Ошибка удаления записи");
            }
        });
    };



    var editHandler = function (buttonHolder, tableData = null){
        let currow =($(buttonHolder).parent()).parent();
        let rownum = (currow.attr('id')).split('-')[1];

        let iterator = 2;
        let oldrow = new Object({id:rownum});
        let currentForm = tableForm;

        if(isset(tableData))
        {
            iterator = 1;
            oldrow = new Object({});
            currentForm = tableData.subTable.tableForm;
        }
        $.each(currentForm, function(name) {
            oldrow[name] = currow.children("#c-"+iterator).text();
            ++iterator;
        });

        FormCreator(currow, oldrow, tableData, true);

        currow.children().children(".cancel").bind("click", function () {
            RowCreator(currow, oldrow, tableData);
        });

        currow.children().children(".save").bind("click", function () {
            let data = SendDataCreator(currow, rownum, tableData, true);


            if(isset(tableData)){
                let subId = new Object({});
                subId[Object.keys(tableData.subTable.tableForm)[0]] = rownum;
                data.subId = subId;
            }


            $.ajax({
                url:"/script/php/edit.php",
                type:"post",
                data: data,
                beforeSend: function () {
                    return notEmpty(currow, tableData);
                },
                success: function (result) {
                    if(result)
                        RowCreator(currow, data, tableData, true);
                    else
                        Notificator($("#sqlError"), "Ошибка при редактировании записи");
                },
                error: function () {
                    Notificator($("#ajaxError"), "Ошибка редактирования записи");
                }
            })
        })
    };



    var addHandler = function (buttonHolder, tableData = null) {
        let adderRow = buttonHolder.parent().parent().prev();
        let newId =  +(adderRow.prev().attr("id").split('-')[1]) + 1;

        adderRow.next().children().children(".add").addClass("ui-state-disabled");

        FormCreator(adderRow,{id: newId}, tableData);
        adderRow.children().children(":input").show(500).css('display','inline-block');


        

        //удаление из ключевого селекта подтаблицы значений, уже находящихся в ней
        if(tableData)
        {
            let row = adderRow.prev();
            let subkeys = [];
            while(row.attr('id') != "headRow"){
                subkeys.push(row.children().first().text());
                row = row.prev();
            }

            adderRow.children("#c-1").children().first().bind("mouseover", function () {
                let option = adderRow.children("#c-1").children().first().children("option").eq(1);

                $.each(subkeys, function (num, skval) {
                    while(option.text() != "")
                        if (option.text() != skval) {
                            option = option.next();
                        }
                        else {
                            let next = option.next();
                            option.remove();
                            option = next;
                        }
                    option = adderRow.children("#c-1").children().first().children("option").eq(1);
                });
            });
        }




        adderRow.children().children(".cancel").bind("click",function () {
            let currow =($(this).parent()).parent();
            currow.children().children(":input").hide(150, function () {currow.html("")});
            adderRow.next().children().children(".add").removeClass("ui-state-disabled");
        });




        adderRow.children().children(".save").bind("click",function () {
            let data = SendDataCreator(adderRow, newId, tableData);

            $.ajax({
                type: "POST",
                url: "/script/php/add.php",
                data: data,

                beforeSend: function () {
                    return notEmpty(adderRow, tableData);
                },
                success: function (result) {
                    if(result) {
                        adderRow.children().children(".cancel").click();
                        if (isset(tableData))
                            newId = data[Object.keys(tableData.subTable.tableForm)[0]];
                        adderRow.before("<tr id='row-" + newId + "'></tr>");
                        let newRow = adderRow.prev();
                        RowCreator(newRow, data, tableData);
                    }
                    else
                        Notificator($("#sqlError"), "Данная запись уже существует");
                },
                error: function () {
                    Notificator($("#ajaxError"), "Ошибка добавления записи");
                }
            });
        });
    };



    var expandHandler = function(buttonHolder){
        let currow =($(buttonHolder).parent()).parent();
        let parentrownum = (currow.attr('id')).split('-')[1];
        let subtableNum= ($(buttonHolder).attr("id")).split('-')[1];

        let data = {
            subTable:subTables[subtableNum],
            parent:{
                fieldName:Object.keys(subTables[subtableNum].tableMark)[0] + "_ID",
                fieldId: parentrownum
            }
        };

        $.post("/script/php/subSelect.php",data,function(res){
            SubTableCreator($("#subTable"), res, data);
            let caption = data.subTable.caption + res[0];
            $("#subTable").dialog({title: caption});
            $("#subTable").dialog("open");
        },"json")
            .fail(function (){Notificator($("#ajaxError"), "Ошибка чтения вложенной таблицы")});
    };




    var SubTableCreator = function (containerHolder, ajaxResult, tableData, flexWidth=null){
        let table = containerHolder.children("table");
        table.append("<tr id='headRow'></tr>");
        let currow = table.children("#headRow");
        let hrow = tableData.subTable.headRow;


        let iterator = 1;
        $.each(hrow, function (key, value) {
            currow.append("<th class='db' id='c-"+ iterator++ +"'>"+value+"</th>");
        });
        currow.append("<th class='db' id='c-"+iterator+"' width='"+flexWidth+"'>Опции</th>");


        $.ajax({
            type: "POST",
            dataType:"json",
            url: "/script/php/selectFieldData.php",
            data: {select_id:Object.keys(tableData.subTable.tableForm)[0]},

            success: function (res) {
                let table = containerHolder.children("table");
                let currow = table.children("#headRow");

                for(let i=1; i < ajaxResult.length; ++i)
                {
                    $.each(res, function (key, value) {
                        if(value == ajaxResult[i][Object.keys(hrow)[0]])
                            table.append("<tr id='row-"+key+"'></tr>");
                    });
                    currow = currow.next();
                    RowCreator(currow, ajaxResult[i], tableData);
                }


                table.append("<tr id='adder'></tr>");
                table.append(
                    "<tr>" +
                    "<td  class='db'  colspan='"+Object.keys(hrow).length+"'></td>" +
                    "<td  style='padding: 5px;'><button class='table add'>Добавить</button></td>" +
                    "</tr>");

                table.children().last().children().last().children(".add").button({icon: "ui-icon-plusthick", showLabel: false}).bind("click", function () {
                    addHandler($(this), tableData);
                    // addHandler(table.children("#adder"), tableData);
                });
            },

            error: function () {
                Notificator($("#ajaxError"), "Ошибка формирования вложенной таблицы");
            }
        });
    };





    //диалоговые формы
    $("#confirm").dialog({
        modal:true,
        autoOpen:false,
        closeText:"Закрыть",
        width:"auto",
        height:"auto",
        buttons:{
            Да:function () {
                deleteHandler($(this).data("buttonHolder"), $(this).data("subTable"));
                $(this).data("subTable", null);
                $(this).dialog("close");
            },
            Нет:function () {
                $(this).dialog("close");
            }
        }
    });
    $("#isEmpty").dialog({
        modal:true,
        autoOpen:false,
        closeText:"Закрыть",
        width:"auto",
        height:"auto",
        buttons:{
            Ок:function () {
                $("#empf").text("");
                $(this).dialog("close");
            }
        }
    });

    $("#subTable").dialog({
         modal:true,
         autoOpen:false,
         closeText:"Закрыть",
         width:"auto",
         height:"auto",
         resizable: false,
         maxHeight:($(document).height())*5/6,
         position:{
             my: "center center",
             at: "center top+17%",
             of: window
         },
         close:function () {
             $(this).children().html("");
         }
     });




//});//end script