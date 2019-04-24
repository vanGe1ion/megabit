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
    function SendDataCreator(rowHandler, rowId) {
        let data = {
            tableMark:tableMark,
            id:rowId
        };

        $.each(tableForm, function( name ) {
            data[name] = rowHandler.children().children("#" + name).val();

        });
        return data;
    }


    //создает из указанной строки стандартную табличную запись с указанным набором данных
    function RowCreator(rowHandler, data) {
        rowHandler.html("");
        let iterator = 1;
        $.each(data, function( id, val ) {
            if(id!="tableMark") {
                rowHandler.append("<td class='db' id='c-" + iterator + "'></td>");
                if (id.substr(-2) != "ID") {
                    rowHandler.children("#c-"+iterator).text(val);                                          //todo kostyl
                } else {
                    $.post("/script/php/selectFieldData.php", {select_id: id}, function (res) {
                        rowHandler.children("#c-"+(iterator-1)).text(res[val]);
                    }, "json");
                }
                ++iterator;
            }
        });

        rowHandler.append("<td class='db' id='c-"+iterator+"'><button class='table edit'>Редактировать</button> <button class='table delete'>Удалть</button></td>");

        rowHandler.children().children(".edit").bind("click", function(){editor(this)});
        rowHandler.children().children(".edit").button({icon: "ui-icon-pencil", showLabel: false});
        rowHandler.children().children(".delete").bind("click", function(){
            $("#confirm").data("buttonHandler", $(this));
            $("#confirm").dialog("open");
        });
        rowHandler.children().children(".delete").button({icon: "ui-icon-trash", showLabel: false});
    }


    //проверка существования переменной
    var isset = function (variable) {
        return typeof(variable) != "undefined" && variable !== null
    };


    var FormElemCreator = function (elemType, elemId, width, value) {
        let newElem;
        switch (elemType) {
            case "select": {
                newElem = $("<select>", {
                    name:elemId,
                    id:elemId,
                    css:{
                        width:width
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
                    css:{
                        width:width
                    }
                });
            }
        }
        return newElem;
    };




    //создание заполняемой формы
    var FormCreator = function (rowHandler, data) {
        let iterator = 2;
        rowHandler.html("<td class='db' id='c-1'>"+data.id+"</td>");

        $.each(tableForm, function( id, type ) {
            let newCell = $("<td class='db' id='c-"+iterator+"'></td>");
            let inpWidth = $("#headRow #c-"+iterator).css("width");
            let inpValue = isset(data[id])?data[id]:"";
            let newElem = FormElemCreator(type, id, inpWidth, inpValue);
            newCell.append(newElem);
            rowHandler.append(newCell);
            ++iterator;
        });
        rowHandler.append("<td class='db' id='c-"+iterator+"' style='text-align: left'><button class='table save'>Сохранить</button> <button class='table cancel'>Отмена</button></td>");
        rowHandler.children().children(".save").button({icon: "ui-icon-disk", showLabel: false});
        rowHandler.children().children(".cancel").button({icon: "ui-icon-cancel", showLabel: false});
    };




    //основные табличные кнопки
    $(".add").click(function () {
        let newId = +($("#adder").prev().attr("id").split('-')[1]) + 1;
        $(this).addClass("ui-state-disabled");

        FormCreator($("#adder"), new Object({id: newId}));
        $("#adder :input").show(500).css('display','inline-block');


        $("#adder .cancel").bind("click",function () {
            let currow =($(this).parent()).parent();
            currow.children().children(":input").hide(150, function () {currow.html("")});
            $(".add").removeClass("ui-state-disabled");
        });



        $("#adder .save").bind("click",function () {
            let data = SendDataCreator($("#adder"), newId);

            $.ajax({
                type: "POST",
                url: "/script/php/add.php",
                data: data,

                beforeSend: function () {
                    return notEmpty($("#adder"));
                },
                success: function () {
                    $(".cancel").click();
                    $("#adder").before("<tr id='row-"+newId+"'></tr>");
                    let newRow = $("#adder").prev();
                    RowCreator(newRow, data);
                },
                error: function () {
                    $("#ajaxError").dialog("open");
                }
            });
         });
    });



    $(".delete").bind("click", function (){
        $("#confirm").data("buttonHandler", $(this));
        $("#confirm").dialog("open");
    });

    $(".edit").bind("click", function (){
        editor(this);
    });

    $(".expand").bind("click", function (){
        expander(this);
    });


    //присваиваемы функции основных табличных кнопок
    var deleter = function (buttonHandler) {
        let currow = ($(buttonHandler).parent()).parent();
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



    var editor = function (buttonHandler){
        let currow =($(buttonHandler).parent()).parent();
        let rownum = (currow.attr('id')).split('-')[1];

        let iterator = 2;
        let oldrow = new Object({id:rownum});
        $.each(tableForm, function(name) {
            oldrow[name] = currow.children("#c-"+iterator).text();
            ++iterator;
        });

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



    var expander = function(buttonHandler){
        let currow =($(buttonHandler).parent()).parent();
        let parentrownum = (currow.attr('id')).split('-')[1];
        $.post()




        $("#subTable").dialog("open");
    };


    //диалоговые формы
    $("#confirm").dialog({
        modal:true,
        autoOpen:false,
        closeText:"Закрыть",
        buttons:{
            Да:function () {
                deleter($(this).data("buttonHandler"));
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
         close:function () {
             $(this).children().html("");
         }
     });




});//end script