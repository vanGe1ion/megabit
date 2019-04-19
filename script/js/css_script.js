$("button").button();
$(":text, :password, [type='number']").focusin(function () {
    $(this).css("border-style", "#408bb6");
}).focusout(function () {
    $(this).css("border-style", "#908c8f");
});
$(".add").button({icon: "ui-icon-plusthick", showLabel: false});
$(".edit").button({icon: "ui-icon-pencil", showLabel: false});
$(".delete").button({icon: "ui-icon-trash", showLabel: false});
$(".expand").button({icons: {secondary:"ui-icon-caret-1-s"}, showLabel: true});



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
            alert("Querry error!");
        }
    });
};



var editor = function (buttonHandler){
    let currow =($(buttonHandler).parent()).parent();
    let rownum = (currow.attr('id')).split('-')[1];

    var iterator = 2;
    let oldrow = new Object({id:rownum});
    $.each(adderElems, function(name) {
        oldrow[name] = currow.children("#c-"+iterator).text();
        ++iterator;
    });
    //console.log(oldrow);
    iterator = 2;
    currow.html("<td class='db' id='c-1'>" + oldrow.id + "</td>");
    $.each(adderElems, function( id, type ) {
        let inpWidth = $("#headRow #c-"+iterator).css("width");
        $(currow).append("<td class='db' id='c-"+iterator+"'><input type='"+type+"' name='"+id+"' id='"+id+"' style='width:"+inpWidth+"' value='"+oldrow[id]+"'></td>");
        ++iterator;
    });

     $(currow).append("<td class='db' id='c-"+iterator+"'><button class='table save'>Сохранить</button> <button class='table cancel'>Отмена</button></td>");
    currow.children("#c-"+iterator).children(".save").button({icon: "ui-icon-disk", showLabel: false}).bind();
    currow.children("#c-"+iterator).children(".cancel").button({icon: "ui-icon-cancel", showLabel: false});
    // currow.load("includes/rowForm.html", function () {
    //     currow.children("#c1").text(oldrow.id);
    //     currow.children("#c2").children().val(oldrow.name);
    //     currow.children("#c3").children().val(oldrow.age);
    //     currow.children("#c4").children().val(oldrow.email);
    //
    //     currow.children("#c5").children("#cancel").button({icon: "ui-icon-cancel", showLabel: false});
    //     currow.children("#c5").children("#cancel").bind("click", function () {
    //         RowReloader(currow, oldrow);
    //     });
    //
    //     currow.children("#c5").children("#save").button({icon: "ui-icon-disk", showLabel: false});
    //     currow.children("#c5").children("#save").bind("click", function () {
    //         let data={
    //             id:rownum,
    //             name:currow.children("#c2").children().val(),
    //             age:currow.children("#c3").children().val(),
    //             email:currow.children("#c4").children().val()
    //         };
    //         $.ajax({
    //             url:"jqOperates/edit.php",
    //             type:"post",
    //             data: data,
    //             beforeSend: function () {
    //                 return notEmpty(currow);
    //             },
    //             success: function () {
    //                 RowReloader(currow, data);
    //             },
    //             error: function () {
    //                 alert("Querry error!");
    //             }
    //         })
    //     })
    // });
};



var notEmpty = function(row){
    let errText = '';
    let iterator =2;
    $.each(adderElems, function( name, type ) {
        if (row.children().children("#"+name).val() == "") {
            let inpName = $("#headRow #c-"+iterator).text();
            errText += inpName+"\n";
            ++iterator;
        }
    });

    if (errText == '')
        return true;
    else {
        $("#empf").text(errText);
        $("#isEmpty").dialog("open");
        return false;
    }
};



function ButtonReloader(rowHandler) {
    rowHandler.children().children(".save").unbind();
    rowHandler.children().children(".save").val("Edit").removeClass("save").addClass("edit").bind("click", function(){editor(this)});
    rowHandler.children().children(".edit").button({icon: "ui-icon-pencil", showLabel: false});
    rowHandler.children().children(".cancel").unbind();
    rowHandler.children().children(".cancel").removeClass("cancel").addClass("delete").bind("click", function(){
        $("#confirm").data("buttonHandler", $(this));
        $("#confirm").dialog("open");
    });
    rowHandler.children().children(".delete").button({icon: "ui-icon-trash", showLabel: false});
}




$(".add").click(function () {
    let newId = +($("#adder").prev().attr("id").split('-')[1]) + 1;
    $(this).addClass("ui-state-disabled");


    var iterator = 2;
    $("#adder").append("<td class='db' id='c-1'>"+newId+"</td>");
    $.each(adderElems, function( id, type ) {
        let inpWidth = $("#headRow #c-"+iterator).css("width");
        $("#adder").append("<td class='db' id='c-"+iterator+"'><input type='"+type+"' name='"+id+"' id='"+id+"' style='width:"+inpWidth+"'></td>");
        ++iterator;
    });

    $("#adder").append("<td class='db' id='c-"+iterator+"'><button class='table save'>Сохранить</button> <button class='table cancel'>Отмена</button></td>");

    $("#adder .save").button({icon: "ui-icon-disk", showLabel: false});
    $("#adder .cancel").button({icon: "ui-icon-cancel", showLabel: false});
    $("#adder :input").show(500).css('display','inline-block');


    $("#adder .cancel").bind("click",function () {
        let currow =($(this).parent()).parent();
        currow.children().children(":input").hide(150, function () {currow.html("")});
        $(".add").removeClass("ui-state-disabled");
    });



    $("#adder .save").bind("click",function () {

        notEmpty($("#adder"));
        let data = {tableMark:tableMark};
        data["id"] = newId;
        $.each(adderElems, function( name, type ) {
                 data[name] = $("#adder #" + name).val();
            });

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
                iterator = 1;
                $.each(data, function( id, val ) {
                    if(id != "tableMark")
                        newRow.append("<td class='db' id='c-"+iterator+"'>"+val+"</td>");
                    ++iterator;
                });
                newRow.append("<td class='db' id='c-"+iterator+"'><button class='table edit'>Редактировать</button> <button class='table delete'>Удалть</button></td>");
                ButtonReloader(newRow);
            },
            error: function () {
                alert("Querry error!");
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






$("#confirm").dialog({modal:true, autoOpen:false, buttons:{
        Да:function () {
            deleter($(this).data("buttonHandler"));
            $(this).dialog("close");
        },
        Нет:function () {
            $(this).dialog("close");
        }}
});


$("#isEmpty").dialog({modal:true, autoOpen:false, buttons:{
        Ок:function () {
            $("#empf").text("");
            $(this).dialog("close");
        }}
});