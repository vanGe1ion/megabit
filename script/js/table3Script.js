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



var TableCreator = function (table, ajaxResult, tableData, flexWidth=null){
    $(table).css("min-width", "auto");
    $(table).append("<tr id='headRow'></tr>");
    let currow = $(table).children("#headRow");
    let hrow = tableData.subTable.headRow;


    let iterator = 1;
    $.each(hrow, function (key, value) {
        currow.append("<th class='db' id='c-"+ iterator++ +"'>"+value+"</th>");
    });
    currow.append("<th class='db' id='c-"+iterator+"' width='"+flexWidth+"'>Опции</th>");


    // $.ajax({
    //     type: "POST",
    //     dataType:"json",
    //     url: "/script/php/selectFieldData.php",
    //     data: {select_id:Object.keys(tableData.subTable.tableForm)[0]},
    //
    //     success: function (res) {
    //         for(let i=1; i < ajaxResult.length; ++i)
    //         {
    //             $.each(res, function (key, value) {
    //                 if(value == ajaxResult[i][Object.keys(hrow)[0]])
    //                     table.append("<tr id='row-"+key+"'></tr>");
    //             });
    //             currow = currow.next();
    //             RowCreator(currow, ajaxResult[i], tableData);
    //         }
    //
    //
    //         table.append("<tr id='adder'></tr>");
    //         table.append(
    //             "<tr>" +
    //             "<td  class='db'  colspan='"+Object.keys(hrow).length+"'></td>" +
    //             "<td  style='padding: 5px;'><button class='table add'>Добавить</button></td>" +
    //             "</tr>");
    //
    //         table.children().last().children().last().children(".add").button({icon: "ui-icon-plusthick", showLabel: false}).bind("click", function () {
    //             addHandler($(this), tableData);
    //             // addHandler(table.children("#adder"), tableData);
    //         });
    //     },

    //     error: function () {
    //         Notificator($("#ajaxError"), "Ошибка формирования вложенной таблицы");
    //     }
    // });
};