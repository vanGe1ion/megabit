class NS_TableK2 {


    //функция отрисовки таблицы
    static TableCreator(containerSelector, tableData, ajaxResult){
        let table = $(containerSelector).children("table");
        table.append("<tr id='headRow'></tr>");
        let currow = table.children("#headRow");
        let hrow = tableData.headRow;
        let tform = tableData.tableForm;

        let tableDataPool = tempDataPool[tableData.tempData];
        let parent = table.attr("id");
        parent = parent.substring(7, parent.length);


        let iterator = 1;
        $.each(hrow, function (key, value) {
            currow.append("<th class='db' id='c-"+ iterator++ +"'>"+value+"</th>");
        });
        //let curExpands = tableData.expands;
        // if(isset(curExpands))
        //     $.each(curExpands, function (key, expand) {
        //         $.each(expand, function (label, expTable) {
        //             currow.append("<th class='db fit' id='c-"+ iterator++ +"'>"+label+"</th>");
        //         });
        //     });

        currow.append("<th class='db options fit' id='c-"+iterator+"'>Опции</th>");


        $.ajax({
            type: "POST",
            dataType:"json",
            url: "/script/php/selectFieldData.php",
            data: {select_id:Object.keys(tform)[0]},

            success: function (res) {
                $.each(ajaxResult, function(key, field){
                    $.each(res, function (selectKey, value) {
                        if(value == field[Object.keys(hrow)[0]])
                            table.append("<tr id='row-"+selectKey+"'></tr>");
                    });
                    currow = currow.next();
                    NS_TableK2.RowCreator(currow, tableData, field);
                });

                table.append(
                    "<tr class='options'>" +
                    "<td  class='db'  colspan='" + (Object.keys(hrow).length + tableData.expands.length) + "'></td>" +
                    "<td  style='padding: 5px;'><button class='table add'>Добавить</button></td>" +
                    "</tr>");

                table.children().last().children().last().children(".add").button({icon: "ui-icon-plusthick"}).removeClass("ui-widget").bind("click", function () {
                    NS_TableK2.AddHandler(this, tableData);
                });

                let curOpts = table.children("#headRow").children(".options");
                curOpts.width(curOpts.width()*2+4);


                if(!$(".footer").children().first().children().first().hasClass("hidden"))
                    $(".options").addClass("hidden");


                $.each(tableDataPool.delete[parent], function (key, data) {
                    table.children("#row-"+key).children().last().children(".delete").click();
                });
                $.each(tableDataPool.create[parent], function (key, data) {
                    let newRow = $("<tr id='row-" + parent + "' class='addMark'></tr>");
                    NS_TableK2.RowCreator(newRow, tableData, data);
                    table.children().last().before(newRow);
                });
                $.each(tableDataPool.update[parent], function (key, data) {
                    NS_TableK2.RowCreator(table.children("#row-"+key).addClass("editMark"), tableData, data);
                });

            },
            error: function () {
                ThrowNotice("#notices", "Error", "Ошибка!", "ajax", "Ошибка чтения вложенной таблицы");
            }
        });
    };



    //присваиваемы функции основных табличных кнопок
    static AddHandler (buttonSelector, tableData) {
        let tableDataPool = tempDataPool[tableData.tempData];
        $(buttonSelector).parent().parent().before($("<tr />"));
        let adderRow = $(buttonSelector).parent().parent().prev();
        let parent = adderRow.parent().attr("id");
        parent = parent.substring(7, parent.length);


        NS_TableK2.FormCreator(adderRow, tableData, {});


        //управление набором опций ключевого селекта(ебаная дичь, кторая трахала мне мозг на протяжении 2 дней)
        let keySelect = adderRow.children().first().children("select");
        keySelect.hover(function () {
            let row = $(buttonSelector).parent().parent().prev();
            let subkeys = [];

            while(row.attr('id') != "headRow") {

                if (row.children("#c-1").children("select").length) {
                    let curSelect = row.children("#c-1").children("select");
                    let curSelVal = curSelect.children("option[value='" + curSelect.val() + "']").text();
                    if (curSelVal !== keySelect.children("option[value='" + keySelect.val() + "']").text() && curSelVal != "")
                        subkeys.push(curSelVal);
                } else
                    subkeys.push(row.children("#c-1").text());
                row = row.prev();
            }


            let options = adderRow.children("#c-1").children("select").children("option");
            $.each(options, function (num, option) {
                $.each(subkeys, function (key, opt){
                    if($(option).text() == opt) {
                        $(option).addClass("hidden");
                        return false;
                    }
                });
            });

            options = adderRow.children("#c-1").children("select").children("option.hidden");
            $.each(options, function (num, option) {
                let mark = 0;
                $.each(subkeys, function (key, opt){
                    if($(option).text() == opt) {
                        mark = 1;
                        return false;
                    }
                });
                if(mark == 0)
                    $(option).removeClass("hidden");
            });
         }, ()=>{});



        adderRow.children().children(".cancel").bind("click",function () {
            let currow =($(this).parent()).parent();
            currow.children().children(":input").hide(150, function () {
                currow.remove();
            });
        });



        adderRow.children().children(".save").bind("click",function () {
            if(NS_TableK2.NotEmpty(adderRow, tableData)){
                let rownum = adderRow.children("#c-1").children("select").val();
                adderRow.attr("id", "row-" + rownum);
                let data = NS_TableK2.SendDataCreator(adderRow, tableData);

                //pool
                PoolDataInserter(tableDataPool, "create", parent, rownum, data);
                //dom
                adderRow.addClass("addMark");
                adderRow.children().children("select, :text, [type='number']").hide(500, function () {
                    NS_TableK2.RowCreator(adderRow, tableData, data);
                });
            }
        });
     };


    static DeleteHandler (buttonSelector, tableData) {
        let tableDataPool = tempDataPool[tableData.tempData];
        let currow = $(buttonSelector).parent().parent();
        let rownum = currow.attr('id').split('-')[1];
        let parent = currow.parent().attr("id");
        parent = parent.substring(7, parent.length);


        if(currow.hasClass("addMark")){
            ThrowDialog("#dialogs", "Удаление", "Удалить новый элемент?", function () {
                //pool
                PoolDataRemover(tableDataPool, "create", parent, rownum);
                //dom
                currow.remove();
            })
        }
        else if(currow.hasClass("editMark"))
        {
            ThrowDialog("#dialogs", "Удаление", "Элемент был изменен. Вернуть первоначальное значение и пометить на удаление?", function () {
                //dom
                NS_TableK2.RowCreator(currow, tableData, tableDataPool.olds[parent][rownum]);
                currow.addClass("deleteMark").removeClass("editMark").children().last().children().first().button("disable");
                currow.children().last().children().last().text("Отменить удл.").button({icon: "ui-icon-trash"}).prev().button("disable");
                //pool
                PoolDataRemover(tableDataPool, "olds", parent, rownum);
                PoolDataRemover(tableDataPool, "update", parent, rownum);
                PoolDataInserter(tableDataPool, "delete", parent, rownum, {});
            })
        }
        else if(currow.hasClass("deleteMark"))
        {
            //dom
            currow.removeClass("deleteMark");
            $(buttonSelector).text("Удалить").button({icon: "ui-icon-trash"}).prev().button("enable");
            //pool
            PoolDataRemover(tableDataPool, "delete", parent, rownum);
        }
        else {
            //dom
            currow.addClass("deleteMark");
            $(buttonSelector).text("Отменить удл.").button({icon: "ui-icon-trash"}).prev().button("disable");
            //pool
            //console.log(isset(tableDataPool.delete[parent]))
            PoolDataInserter(tableDataPool, "delete", parent, rownum, {})
        }
    };


    static EditHandler (buttonSelector, tableData){
        let tableDataPool = tempDataPool[tableData.tempData];
        let currow = $(buttonSelector).parent().parent();
        let rownum = currow.attr('id').split('-')[1];
        let parent = currow.parent().attr("id");
        parent = parent.substring(7, parent.length);

        let iterator = 1;
        let oldrow = new Object();
        let currentForm = tableData.tableForm;



        $.each(currentForm, function(name) {
            oldrow[name] = currow.children("#c-"+iterator).text();
            ++iterator;
        });
        NS_TableK2.FormCreator(currow, tableData, oldrow);

        currow.children().children(".cancel").bind("click", function () {
            currow.children().children("select, :text, [type='number']").hide(500, function () {
                NS_TableK2.RowCreator(currow, tableData, oldrow);
            });
        });

        currow.children().children(".save").bind("click", function () {
            let data = NS_TableK2.SendDataCreator(currow, tableData);
            if(NS_TableK2.NotEmpty(currow, tableData)) {
                currow.children().children("select, :text, [type='number']").hide(500, function () {
                    NS_TableK2.RowCreator(currow,tableData, data);
                    if(currow.hasClass("addMark")) {
                        //pool
                        PoolDataInserter(tableDataPool, "create", parent, rownum, data);
                    }
                    if(currow.hasClass("editMark")) {
                        //pool
                        PoolDataInserter(tableDataPool, "update", parent, rownum, data);
                    }
                    if(!currow.hasClass("addMark") && !currow.hasClass("editMark")) {
                        //pool
                        PoolDataInserter(tableDataPool, "olds", parent, rownum, oldrow);
                        PoolDataInserter(tableDataPool, "update", parent, rownum, data);
                        //dom
                        currow.addClass("editMark");
                    }
                });
            }
        })
    };


    // static ExpandHandler (buttonSelector, tableData){
    //     let currow =$(buttonSelector).parent().parent();
    //     let parentRowNum = currow.attr('id').split('-')[1];
    //     let expandNum= $(buttonSelector).attr("id").split('-')[1];
    //     let currentExp = Object.values(tableData.expands[expandNum])[0];
    //
    //
    //     let data = {
    //         queryName:currentExp.querySet['read'],
    //         queryData:parentRowNum
    //     };
    //
    //     let namespace = '';
    //     switch (currentExp.mainKey.length) {
    //         case 1:{namespace = NS_TableK2; break;}
    //         case 2:{console.log("NS_TableK3");/*namespace = NS_TableK3;*/break;}
    //         default:{namespace = NS_TableK1; break;}
    //     }
    //
    //     $.post("/script/php/newSelect.php",data,function(res){
    //         $("#expTable-"+expandNum).children("table").attr("id", "parent-"+parentRowNum);
    //         namespace.TableCreator("#expTable-"+expandNum, currentExp, res);
    //         let caption = currentExp.caption + currow.children("#c-2").text();
    //         $("#expTable-"+expandNum).dialog({title: caption}).dialog("open");
    //     },"json")
    //         .fail(function (){
    //             ThrowNotice("#notices", "Error", "Ошибка!", "ajax", "Ошибка чтения вложенной таблицы")
    //         });
    // };



    //создает из указанной строки стандартную табличную запись с указанным набором данных
    static RowCreator(rowHolder, tableData, data) {
        rowHolder.html("");
        let iterator = 1;
        let selects=[];
        $.each(data, function( id, val ) {
            if (id.substr(-2) != "ID" || !$.isNumeric(val))
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
                    .fail(function (){
                        ThrowNotice("#notices", "Error", "Ошибка!", "ajax","Ошибка формирования значения элемента (SelectField)")
                    });
                return await JSON.parse(mySelect);
            })().then(function (result) {
                rowHolder.children("#c-" + value.iter).text(result[value.myval]);
            });
        });


        // let expands = tableData.expands;
        // if(expands.length != 0)
        //     $.each(expands, function (key, expand){
        //         $.each(expand, function (label, expTable) {
        //             let newButton = $("<button class='table expand' id='exp-"+key+"'>"+label+"</button>");
        //             let newCell = $("<td class='db' id='c-"+iterator+"'></td>");
        //             newCell.append(newButton).appendTo(rowHolder);
        //             ++iterator;
        //         });
        //     });
        //
        // rowHolder.children().children(".expand").button({icon:"ui-icon-document"}).removeClass("ui-widget").bind("click", function(){
        //     NS_TableK2.ExpandHandler(this, tableData);
        //     console.log("expandK2");
        // });

        rowHolder.append($("<td class='db options' id='c-"+iterator+"'></td>"));

        rowHolder.children().last().append("<button class='table edit'>Редактировать</button> <button class='table delete'>Удалть</button>");

        rowHolder.children().children(".edit").button({icon: "ui-icon-pencil"}).removeClass("ui-widget").bind("click", function(){
            NS_TableK2.EditHandler(this, tableData);
        });

        rowHolder.children().children(".delete").button({icon: "ui-icon-trash"}).removeClass("ui-widget").bind("click", function(){
            NS_TableK2.DeleteHandler(this, tableData);
        });
    }



    //создание заполняемой формы
    static FormCreator (rowHolder, tableData, data) {

        let iterator = 1;
        let currentForm = tableData.tableForm;

        rowHolder.html("");


        $.each(currentForm, function( id, type ) {
            let newCell = $("<td class='db' id='c-"+iterator+"'></td>");
            let inpWidth = rowHolder.siblings().first().children("#c-"+iterator).css("width");
            let inpValue = isset(data[id])?data[id]:"";
            let newElem = FormElemCreator(type, id, inpWidth, inpValue);
            newCell.append(newElem);
            rowHolder.append(newCell);
            ++iterator;
        });


        // let expands = tableData.expands;
        // if(isset(expands) && expands.length != 0)
        //     $.each(expands, function (key, expand){
        //         $.each(expand, function (label, expTable) {
        //             let newButton = $("<button class='table expand ' id='exp-"+key+"'>"+label+"</button>");
        //             let newCell = $("<td class='db fit' id='c-"+iterator+"'></td>");
        //             newCell.append(newButton).appendTo(rowHolder);
        //             ++iterator;
        //         });
        //     });
        //rowHolder.children().children(".expand").button({icon: "ui-icon-document"}).button("disable").removeClass("ui-widget");


        rowHolder.append(
            "<td class='db fit options' id='c-"+iterator+"' style='text-align: left'>" +
            "<button class='table save '>Сохранить</button> " +
            "<button class='table cancel '>Отмена</button>" +
            "</td>"
        );
        rowHolder.children().children(".save").button({icon: "ui-icon-disk"}).removeClass("ui-widget");
        rowHolder.children().children(".cancel").button({icon: "ui-icon-cancel"}).removeClass("ui-widget");


        rowHolder.children().children(":input").show(500).css('display','inline-block');
    };



    //проверка пустых полей
    static NotEmpty (rowHolder, tableData){
        let errText = "";
        let iterator = 1;
        let form = tableData.tableForm;

        $.each(form, function( name, type ) {
            if (rowHolder.children().children("#"+name).val() == "") {
                let inpName = rowHolder.parent().children("#headRow").children("#c-"+iterator).text();
                errText += inpName + "<br>";
            }
            ++iterator;
        });

        if (errText == '')
            return true;
        else {
            ThrowNotice("#notices", "Info", "Подсказка", "JS",
                "Следующие поля не должны быть пустыми:<br><p style='margin-left: 5%'>"+errText+"</p>");
            return false;
        }
    }



    //функция взятия данных с формы
    static SendDataCreator(rowHolder, tableData) {
        let currentForm = tableData.tableForm;
        let data = {};
        // let mainKeys = rowHolder.parent().attr("id");
        // mainKeys = mainKeys.slice(7, mainKeys.length).split("-");
        //
        // $.each(mainKeys, function (key, val) {
        //     data[tableData.mainKey[key]] = val;
        // });

        $.each(currentForm, function (name) {
            data[name] = rowHolder.children().children("#" + name).val();
        });

        return data;
    }
}
