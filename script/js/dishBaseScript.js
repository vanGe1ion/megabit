//настройка вида кнопок
$(".add").button({icon: "ui-icon-plusthick", showLabel: false});
$(".edit").button({icon: "ui-icon-pencil", showLabel: false});
$(".delete").button({icon: "ui-icon-trash", showLabel: false});
$(".expand").button({icons: {secondary:"ui-icon-document"}, showLabel: true});


//основные табличные кнопки
$(".add").click(function () {
    addHandler($(this));
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