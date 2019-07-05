//настройка вида кнопок
$(".add").button({icon: "ui-icon-plusthick"});
$(".edit").button({icon: "ui-icon-pencil"});
$(".delete").button({icon: "ui-icon-trash"});
$(".expand").button({icon: "ui-icon-document"});
$("button:contains("+TableData.caption+")").button( "disable" );
$("div.overlay, div.wait-box").fadeOut(200);

var dataPoolArray = {};
DataPoolCreator(dataPoolArray, TableData);




//настройка таблицы
$("th#c-1").addClass("fit");
$("th.options").width($("th.options").width()*2+3);
$(".options").addClass("hidden");




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
        let currentDataPool = dataPoolArray[Object.values(TableData.expands[expNum])[0].poolName];
        let cell = $("#row-" + parent).children("td").children("#exp-" + expNum).parent();
        $.each(currentDataPool, function (level, data) {
            let indicator = $("#row-" + parent).children("td").children("#exp-" + expNum).siblings("." + level + "Ind");
            if (isset(data[parent])) {
                indicator.removeClass("hidden");
                cell.width($("[id='exp-" + expNum + "']").width() + 10 + 38);
            } else {
                indicator.addClass("hidden");
                if (indicator.siblings("img.hidden").length == 2)
                    cell.width(1);
            }
        });

         $("[id^='expTable-']").children("table").html("").removeAttr("id");
    },
    beforeClose: function () {
        if ($("[id^='expTable-'] table td .save").length) {
            ThrowNotice("#notices", "Info", "Подсказка", "JS",
                "Имеются непринятые изменения. Пожалуйста, для продолжения сохраните или отмените их");
            return false;
        }
    }
});




//кнопки управления формой
EditPanelCreator();

$("#db-edit").click(function () {
    $(this).addClass("hidden");
    $("#db-save, #db-cancel").removeClass("hidden");
    $(".horMenu").button("disable");
    $(".options").fadeIn(500);
});

$("#db-cancel").click(function () {
    ThrowDialog("#dialogs", "Отмена изменений", "Отменить все внесенные изменения?", function () {
        $("#db-edit").removeClass("hidden");
        $("#db-save, #db-cancel").addClass("hidden");
        $(".horMenu").button("enable");
        $("button:contains("+TableData.caption+")").button( "disable" );


        $(".addMark").remove();
        $(":contains('Отменить удл.')").click();
        $(".cancel").click();
        $.each($(".editMark"), function (key, row) {
            $(row).removeClass("editMark");
            NS_TableK1.RowCreator($(row), TableData, dataPoolArray[TableData.poolName].olds[$(row).attr("id").split("-")[1]])
        });
        setTimeout(function () {
            $(".options").fadeOut(150);
        },150);
        DataPoolCreator(dataPoolArray, TableData);
        $(".indicator").addClass("hidden").parent().width(1);
    })
});

$("#db-save").click(function () {
    if ($("table td .save").length)
        ThrowNotice("#notices", "Info", "Подсказка", "js",
            "Имеются непринятые изменения. Пожалуйста, для продолжения сохраните или отмените их");
    else if($(".addMark, .editMark, .deleteMark").length == 0 && $("img.indicator").length == $("img.indicator.hidden").length){
        $("#db-edit").removeClass("hidden");
        $("#db-save, #db-cancel").addClass("hidden");
        $(".horMenu").button("enable");
        $("button:contains("+TableData.caption+")").button( "disable" );
        $(".options").fadeOut(150);
    }
    else{

        $(document).bind("ajaxStart", function () {
            $("div.overlay, div.wait-box").fadeIn(200);
        });

        $(document).bind("ajaxStop", function () {
            $("div.overlay, div.wait-box").fadeOut(200);

            if($(".addMark, .editMark, .deleteMark").length || $(".indicator.hidden").length < $(".indicator").length)
                ThrowNotice("#notices", "Info", "Результат запроса", "js",
                    "Некоторые запросы не были выполнены");
            else{
                setTimeout(function () {
                    ThrowNotice("#notices", "Info", "Результат запроса", "js",
                        "Все запросы выполнены успешно");
                    $("#db-edit").removeClass("hidden");
                    $("#db-save, #db-cancel").addClass("hidden");
                    $(".horMenu").button("enable");
                    $("button:contains("+TableData.caption+")").button( "disable" );
                    $(".options").fadeOut(150);
                },150);
            }

            $(this).unbind();
        });

        DataPoolRequester(dataPoolArray, TableData,
            function (data) {
            let row = $("#row-"+data.id);
            switch (data.levelName) {
                case "delete":{row.remove(); break;}
                case "update":{row.removeClass("editMark"); break;}
                case "create":{row.removeClass("addMark"); break;}
            }
        }, function (data) {
                if(!isset(dataPoolArray[data.poolName][data.levelName][data.parent])) {
                    let curCell =  $("#row-" + data.parent + " td").children("#exp-" + data.expNum).parent();
                    curCell.children("." + data.levelName + "Ind").addClass("hidden");
                    if(curCell.children("img.hidden").length == 3)
                        curCell.width(1);
                }
        });
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

