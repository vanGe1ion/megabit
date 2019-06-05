//настройка вида кнопок
$(".add").button({icon: "ui-icon-plusthick"});
$(".edit").button({icon: "ui-icon-pencil"});
$(".delete").button({icon: "ui-icon-trash"});
$(".expand").button({icon: "ui-icon-document"});
$("button:contains("+TableData.caption+")").button( "disable" );

//настройка таблицы
$("td#c-1").addClass("fit");
$("th.options").width($("th.options").width()*2+3);
$(".options").addClass("hidden");


//кнопки управления формой
$("div.footer").prepend($("<div />", {
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
$("div.content").height($("body").height()-$("footer").height());



$("#db-edit").click(function () {
    $(this).addClass("hidden");
    $("#db-save, #db-cancel").removeClass("hidden");
    $(".options").fadeIn(500);
});


$("#db-cancel").click(function () {
    $("#db-edit").removeClass("hidden");
    $("#db-save").addClass("hidden");
    $(this).addClass("hidden");
    $(".options").fadeOut(500);

    $(".addMark").remove();
    $(":contains('Отменить удл.')").click();
    $.each($(".editMark"), function (key, row) {
        $(row).removeClass("editMark");
        NS_TableK1.RowCreator($(row), TableData, tempDataPool[TableData.tempData].olds[$(row).attr("id").split("-")[1]])
    });
    CreateDataPool(tempDataPool, TableData);
    $(".createInd, .updateInd, .deleteInd").addClass("hidden");
});

$("#db-save").click(function () {
    $("#db-cancel").click();
});


//вложенные таблицы
$("[id^='expTable-']").dialog({
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
        let parent = $(this).children("table").attr("id");
        parent = parent.substring(7, parent.length);
        let expNum = $(this).attr("id").split("-")[1];
        let tableDataPool = tempDataPool[Object.values(TableData.expands[expNum])[0].tempData];
        let cell = $("#row-"+parent).children("td").children("#exp-"+expNum).parent();
        $.each(tableDataPool, function (level, data) {
            let indicator =$("#row-"+parent).children("td").children("#exp-"+expNum).siblings("."+level+"Ind");
            if(isset(data[parent])) {
                indicator.removeClass("hidden");
                cell.width($("[id='exp-"+expNum+"']").width()+10+38);
            }
            else {
                indicator.addClass("hidden");
                if(indicator.siblings("img.hidden").length == 2)
                    cell.width(1);
            }
        });

        $(this).children("table").html("").removeAttr("id");
    }
});



//основные табличные кнопки
$(".add").click(function () {
    NS_TableK1.AddHandler(this, TableData);
});

$(".delete").bind("click", function (){
    NS_TableK1.DeleteHandler(this, TableData);
});

$(".edit").bind("click", function (){
    NS_TableK1.EditHandler(this, TableData);
});

$(".expand").bind("click", function (){
    NS_TableK1.ExpandHandler(this, TableData);
});



var tempDataPool = {};
CreateDataPool(tempDataPool, TableData);


$("#db-edit").click();
//$("#exp-0").click();

