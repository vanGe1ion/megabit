$("[id='delete']").button({icon: "ui-icon-trash", showLabel: false});
$("[id='edit']").button({icon: "ui-icon-pencil", showLabel: false});
$("#add").button({icon: "ui-icon-plus", showLabel: false});

var deleter = function (buttonHandler) {
    let currow = ($(buttonHandler).parent()).parent();
    let data = {id: (currow.attr('id')).split('-')[1]};


    $.ajax({
        type: "POST",
        url: "jqOperates/delete.php",
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
    let oldrow={
        id:rownum,
        name:currow.children("#c2").text(),
        age:currow.children("#c3").text(),
        email:currow.children("#c4").text()
    };

    currow.load("includes/rowForm.html", function () {
        currow.children("#c1").text(oldrow.id);
        currow.children("#c2").children().val(oldrow.name);
        currow.children("#c3").children().val(oldrow.age);
        currow.children("#c4").children().val(oldrow.email);

        currow.children("#c5").children("#cancel").button({icon: "ui-icon-cancel", showLabel: false});
        currow.children("#c5").children("#cancel").bind("click", function () {
            RowReloader(currow, oldrow);
        });

        currow.children("#c5").children("#save").button({icon: "ui-icon-disk", showLabel: false});
        currow.children("#c5").children("#save").bind("click", function () {
            let data={
                id:rownum,
                name:currow.children("#c2").children().val(),
                age:currow.children("#c3").children().val(),
                email:currow.children("#c4").children().val()
            };
            $.ajax({
                url:"jqOperates/edit.php",
                type:"post",
                data: data,
                beforeSend: function () {
                    return notEmpty(currow);
                },
                success: function () {
                    RowReloader(currow, data);
                },
                error: function () {
                    alert("Querry error!");
                }
            })
        })
    });
};




function RowReloader(rowHandler, data) {
    rowHandler.children("#c2").text(data.name);
    rowHandler.children("#c3").text(data.age);
    rowHandler.children("#c4").text(data.email);
    rowHandler.children("#c5").children("#save").unbind();
    rowHandler.children("#c5").children("#save").val("Edit").attr("id","edit").bind("click", function(){editor(this)});
    rowHandler.children("#c5").children("#edit").button({icon: "ui-icon-pencil", showLabel: false});
    rowHandler.children("#c5").children("#cancel").unbind();
    rowHandler.children("#c5").children("#cancel").val("Delete").attr("id","delete").bind("click", function(){
        $("#confirm").data("buttonHandler", $(this));
        $("#confirm").dialog("open");
    });
    rowHandler.children("#c5").children("#delete").button({icon: "ui-icon-trash", showLabel: false});
}



var notEmpty = function(row){
    let errText = '';
    if (row.children("#c2").children().val() == "") {
        errText += "Name\n";
    }
    if (row.children("#c3").children().val() == "") {
        errText += "Age\n";
    }
    if (row.children("#c4").children().val() == "") {
        errText += "Email\n";
    }
    if (errText == '')
        return true;
    else {
        alert("Next fields must be no empty:\n\n" + errText);
        return false;
    }
};





$("#add").click(function () {
    let newId = +($("#adder").prev().attr("id").split('-')[1]) + 1;

    $(this).addClass("ui-state-disabled");

    $("#adder").load("includes/rowForm.html", function () {

        $("#adder #save").button({icon: "ui-icon-disk", showLabel: false});
        $("#adder #cancel").button({icon: "ui-icon-cancel", showLabel: false});
        $("#adder :input").show(500);
        $("#adder #c1").text(newId);


        $("#adder #cancel").bind("click",function () {
            let currow =($(this).parent()).parent();
            currow.children().children(":input").hide(300, function () {currow.html("")});
            $("#add").removeClass("ui-state-disabled");
        });



        $("#adder #save").bind("click",function () {

            let data = {
                id:newId,
                name: $("#adder div #name").val(),
                age: $("#adder div #age").val(),
                email: $("#adder div #email").val()
            };
            $.ajax({
                type: "POST",
                url: "jqOperates/add.php",
                data: data,

                beforeSend: function () {
                    return notEmpty($("#adder"));
                },
                success: function () {
                    $("#cancel").click();

                    $("#adder").before("<div class='drow' id='row-"+newId+"'></div>");
                    $("#row-" + newId).load("includes/rowForm.html", function () {
                        $(this).children("#c1").text(data.id);
                        RowReloader($(this), data);
                    });

                },
                error: function () {
                    alert("Querry error!");
                }
            });
        });
    });
});





$("[id='edit']").bind("click", function (){
    editor(this);
});


$("[id='delete']").bind("click", function (){
    $("#confirm").data("buttonHandler", $(this));
    $("#confirm").dialog("open");
});

$("#confirm").dialog({modal:true, autoOpen:false, buttons:{
        Yes:function () {
            deleter($(this).data("buttonHandler"));
            $(this).dialog("close");
        },
        No:function () {
            $(this).dialog("close");
        }}
});