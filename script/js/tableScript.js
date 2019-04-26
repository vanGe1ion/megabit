$(document).ready(function () {

    //настройка вида кнопок
    $(".add").button({icon: "ui-icon-plusthick", showLabel: false});
    $(".edit").button({icon: "ui-icon-pencil", showLabel: false});
    $(".delete").button({icon: "ui-icon-trash", showLabel: false});
    $(".expand").button({icons: {secondary:"ui-icon-document"}, showLabel: true});



    //проверка пустых полей
    var notEmpty = function(row){
        let errText = "";
        let iterator = 2;
        $.each(tableForm, function( name, type ) {
            if (row.children().children("#"+name).val() == "") {
                let inpName = $("#headRow #c-"+iterator).text();
                errText += inpName + "<br>";
                ++iterator;
            }
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

    function SendDataCreator(rowHolder, rowId, tableData = null) {
        let currentForm = tableForm;
        let currentTmark = tableMark;
        let currentId = rowId;
        if(isset(tableData))
        {
            currentForm = tableData.subTable.tableForm;
            currentTmark = tableData.subTable.tableMark;
            currentId = tableData.parent.fieldId;
        }


        let data = {
            id:currentId,
            tableMark:currentTmark
        };

        $.each(currentForm, function (name) {
            data[name] = rowHolder.children().children("#" + name).val();
        });
        return data;
    }




    //создает из указанной строки стандартную табличную запись с указанным набором данных
    function RowCreator(rowHolder, data, tableData = null) {
        rowHolder.html("");
        let iterator = 1;
        delete (data.tableMark);
        if(isset(tableData))
            delete (data.id);

        //$.each(data, function( id, val ) {rowHolder.append("<td class='db' id='c-" + iterator++ + "'>"+val+"</td>");});


        $.each(data, function( id, val ) {
            if (id.substr(-2) != "ID" || !isNumeric(val)) {
                rowHolder.append("<td class='db' id='c-" + iterator + "'>"+val+"</td>");
            } else {


                $.post("/script/php/selectFieldData.php", {select_id: id, iter:iterator}, function (res) {
                    console.log(res);
                    rowHolder.append("<td class='db' id='c-" + res.iter + "'>" + res[val] + "</td>");
                }, "json");
                setTimeout(function(){}, 2000);
            }
            ++iterator;
        });

        rowHolder.append("<td class='db' id='c-"+iterator+"'><button class='table edit'>Редактировать</button> <button class='table delete'>Удалть</button></td>");

        rowHolder.children().children(".edit").bind("click", function(){editHandler(this, tableData)});
        rowHolder.children().children(".edit").button({icon: "ui-icon-pencil", showLabel: false});
        rowHolder.children().children(".delete").bind("click", function(){
            $("#confirm").data("buttonHolder", $(this));
            $("#confirm").data("subTable", tableData);
            $("#confirm").dialog("open");
        });
        rowHolder.children().children(".delete").button({icon: "ui-icon-trash", showLabel: false});
    }


    //проверка существования переменной
    var isset = function (variable) {
        return typeof(variable) != "undefined" && variable !== null
    };
    //проверка на число
    var isNumeric = function isNumeric(variable) {
        return !isNaN(parseFloat(variable)) && isFinite(variable)
    };


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
                        $("#ajaxError").dialog("open");
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
                    minValue:0,
                    css:{
                        width:width
                    }
                });
            }
        }
        return newElem;
    };




    //создание заполняемой формы
    var FormCreator = function (rowHolder, data) {
        //console.log(data);
        let iterator;
        let currentForm;
        let newRow;

        if(isset(data.tableData))
        {
            iterator = 1;
            currentForm = data.tableData.subTable.tableForm;
            newRow = data.tableData.parent.fieldId;
        }
        else
        {
            iterator = 2;
            currentForm = tableForm;
            newRow = data.id;
            rowHolder.html("<td class='db' id='c-1'>"+newRow+"</td>");
        }


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




    //основные табличные кнопки
    $(".add").click(function () {
        addHandler($("#adder"));
    });

    $(".delete").bind("click", function (){
        $("#confirm").data("buttonHolder", $(this));
        $("#confirm").dialog("open");
    });

    $(".edit").bind("click", function (){
        editHandler(this);
    });

    $(".expand").bind("click", function (){
        expandHandler(this);
    });


    //присваиваемы функции основных табличных кнопок
    var deleteHandler = function (buttonHolder, tableData = null) {
        let currow = ($(buttonHolder).parent()).parent();
        let data = {
            tableMark:tableMark,
            id: (currow.attr('id')).split('-')[1]
        };

        $.ajax({
            type: "POST",
            url: "/script/php/delete.php",
            data: data,
            success: function () {
                currow.remove("#" + currow.attr("id"));
            },
            beforeSend: function (){
                return $("#confirm").dialog("open");
            },
            error: function () {
                $("#ajaxError").dialog("open");
            }
        });
    };



    var editHandler = function (buttonHolder, tableData = null){
        let currow =($(buttonHolder).parent()).parent();
        let rownum = (currow.attr('id')).split('-')[1];

        let iterator = 2;
        let oldrow = new Object({id:rownum});
        $.each(tableForm, function(name) {
            oldrow[name] = currow.children("#c-"+iterator).text();
            ++iterator;
        });
console.log(oldrow);
        FormCreator(currow, oldrow);

        currow.children().children(".cancel").bind("click", function () {
            RowCreator(currow, oldrow);
        });

        currow.children().children(".save").bind("click", function () {
            let data = SendDataCreator(currow, rownum);

            $.ajax({
                url:"/script/php/edit.php",
                type:"post",
                data: data,
                beforeSend: function () {
                    return notEmpty(currow);
                },
                success: function () {
                    RowCreator(currow, data);
                },
                error: function () {
                    $("#ajaxError").dialog("open");
                }
            })
        })
    };



    var addHandler = function (rowHolder, tableData = null) {
        let newId;
        //if(!isset(parent)){
            newId = +(rowHolder.prev().attr("id").split('-')[1]) + 1;
        //}
        //else{

       // }
        rowHolder.next().children().children(".add").addClass("ui-state-disabled");

        FormCreator(rowHolder,{id: newId, tableData:tableData});
        rowHolder.children().children(":input").show(500).css('display','inline-block');

        rowHolder.children().children(".cancel").bind("click",function () {
            let currow =($(this).parent()).parent();
            currow.children().children(":input").hide(150, function () {currow.html("")});
            rowHolder.next().children().children(".add").removeClass("ui-state-disabled");
        });



        rowHolder.children().children(".save").bind("click",function () {
            console.log(tableData);
            let data = SendDataCreator(rowHolder, newId, tableData);

            $.ajax({
                type: "POST",
                url: "/script/php/add.php",
                data: data,

                beforeSend: function () {
                    return notEmpty(rowHolder);
                },
                success: function () {
                    rowHolder.children().children(".cancel").click();
                    if(isset(tableData))
                        newId = data[Object.keys(tableData.subTable.tableForm)[0]];
                    rowHolder.before("<tr id='row-"+newId+"'></tr>");
                    let newRow = rowHolder.prev();
                    RowCreator(newRow, data, tableData);
                },
                error: function () {
                    $("#ajaxError").dialog("open");
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

        $.post("/script/php/select.php",data,function(res){
            SubTableCreator(res, data);
            let caption = data.subTable.caption + res[0];
            $("#subTable").dialog({title: caption});
            $("#subTable").dialog("open");
        },"json");
        // $.each(tableMark , function (key, value) {
        //     subTableHandlers[key][subtableNum](data);
        // })
    };

// var subTableHandlers = {
//     Dish:{
//         0:function (data) {
//             $.post("/script/php/select.php",data,function(res){
//                 SubTableCreator(res, data);
//                 let caption = data.subTable.caption + res[0];
//                 $("#subTable").dialog({title: caption});
//                 $("#subTable").dialog("open");
//             },"json");
//         }
//     }
// };


    var SubTableCreator = function (ajaxResult, tableData){
        let table = $("#subTable").children().first();
        console.log(tableData);

        table.append("<tr id='headRow'></tr>");
        let currow = table.children("#headRow");
        let hrow = tableData.subTable.headRow;


        let iterator = 1;
        $.each(hrow, function (key, value) {
            currow.append("<th class='db' id='c-"+ iterator++ +"'>"+value+"</th>");
        });
        currow.append("<th class='db' id='c-"+iterator+"'>Опции</th>");


        $.ajax({
            type: "POST",
            dataType:"json",
            url: "/script/php/selectFieldData.php",
            data: {select_id:Object.keys(tableData.subTable.tableForm)[0]},

            success: function (res) {
                let table = $("#subTable").children().first();
                let currow = table.children("#headRow");

                for(let i=1; i < ajaxResult.length; ++i)
                {
                    $.each(res, function (key, value) {
                        if(value == ajaxResult[i][Object.keys(hrow)[0]])
                            table.append("<tr id='row-"+key+"'></tr>");
                    });
                    currow = currow.next();
                    RowCreator(currow, ajaxResult[i]);
                }


                table.append("<tr id='adder'></tr>");
                table.append("<tr>" +
                    "<td  class='db'  colspan='"+Object.keys(hrow).length+"'></td>" +
                    "<td  style='padding: 5px;'><button class='table add'>Добавить</button></td>" +
                    "</tr>");
                $("#subTable .add").button({icon: "ui-icon-plusthick", showLabel: false}).bind("click", function () {
                    addHandler($("#subTable #adder"), tableData);
                });
            },

            error: function () {
                $("#ajaxError").dialog("open");
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
    $("#ajaxError").dialog({
        modal:true,
        autoOpen:false,
        closeText:"Закрыть",
        width:"auto",
        height:"auto",
        buttons:{
            Ок:function () {
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
         close:function () {
             $(this).children().html("");
         }
     });




});//end script