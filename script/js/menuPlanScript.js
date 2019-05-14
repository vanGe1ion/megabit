$(".calendar").datepicker({
    dateFormat:"dd.mm.yy",
    selectWeek: true,
    onSelect:function(){
        $.each($(".tableDate"), function (key, caption) {
            $(caption).text("");
        });
        var dates = [];
        let selectedDate = moment($(this).datepicker('getDate'));
        let curdate = moment(selectedDate);

        if(curdate.weekday() == 0)
            curdate.subtract(7-1, "d");
        else
            curdate.subtract(curdate.weekday()-1, "d");
        for(let i = 0; i < 6; ++i){
            dates[i] = moment(curdate);
            curdate.add(1, "d");
        }
        $(this).val(dates[0].format("DD.MM.Y") + " - " + dates[5].format("DD.MM.Y"));
        $.each($(".tableDate"), function (key, caption) {
            $(caption).prepend(dates[key].locale("ru").format("D MMMM Y г. "));

            $.ajax({
                url:"/script/php/select.php",
                type:"post",
                dataType:"json",
                data:{
                    tableName: "MENU_LIST",
                    Date:dates[key].format("Y-MM-DD")
                },

                success: function (res) {
                    if(res.length == 0) {
                        $(caption).append($("<button class='table add'> Новое меню </button>").button({icon: "ui-icon-plusthick", showLabel: false}));
                    }
                    else {
                        $(caption).append($("<button class='table edit'> Изменить дату </button>").button({icon: "ui-icon-calendar", showLabel: false}));
                        $(caption).append($("<button class='table delete'> Новое меню </button>").button({icon: "ui-icon-trash", showLabel: false}));

                        let data = {
                            subTable:subTables[0],
                            parent:{
                                fieldName: "Menu_ID",
                                fieldId: res[0]
                            }
                        };

                        $.ajax({
                            url: "/script/php/subSelect.php",
                            type:"post",
                            dataType:"json",
                            data:data,

                            success: function (res) {
                                console.log(res);
                            },

                            error: function () {
                                Notificator($("#ajaxError"), "Ошибка чтения меню на " + dates[key].format("DD.MM.Y"));
                            }
                        });
                    }
                },

                error: function () {
                    Notificator($("#ajaxError"), "Ошибка чтения списка меню (" + dates[key].format("DD.MM.Y") +")");
                }
            })
        });




    }
});
