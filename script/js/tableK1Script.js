class NS_TableK1 {

    //присваиваемы функции основных табличных кнопок
    static AddHandler(buttonSelector, tableData) {
        let currentDataPool = queryDataPool[tableData.poolName];
        $(buttonSelector).parent().parent().before($("<tr />"));
        let adderRow = $(buttonSelector).parent().parent().prev();
        let newId =  +(adderRow.prev().attr("id").split('-')[1]) + 1;
        adderRow.attr("id", "row-"+newId);

        NS_TableK1.FormCreator(adderRow, tableData, {id:newId});

        adderRow.children().children(".cancel").bind("click",function () {
            let currow =($(this).parent()).parent();
            currow.children().children(":input").hide(150, function () {
                currow.remove();
            });
        });


        adderRow.children().children(".save").bind("click",function () {
            if(NS_TableK1.NotEmpty(adderRow, tableData)){
                let data = NS_TableK1.SendDataCreator(adderRow, tableData);

                //pool
                PoolDataInserter(currentDataPool, "create", null, newId, data);
                //dom
                adderRow.addClass("addMark");
                adderRow.children().children("select, :text, [type='number']").hide(150, function () {
                    NS_TableK1.RowCreator(adderRow, tableData, data);
                });
            }
        });
    }


    static DeleteHandler (buttonSelector, tableData) {
        let currentDataPool = queryDataPool[tableData.poolName];
        let currow = $(buttonSelector).parent().parent();
        let rownum = currow.attr('id').split('-')[1];
        if(currow.hasClass("addMark")){
            ThrowDialog("#dialogs", "Удаление", "Удалить новый элемент?", function () {
                //pool
                PoolDataRemover(currentDataPool, "create", null, rownum);
                $.each(tableData.expands, function (num, expand) {
                    $.each(expand, function (label, expTable) {
                        PoolDataRemover(queryDataPool[expTable.poolName], "create", rownum, null);
                    })
                });
                //dom
                currow.remove();
            })
        }
        else if(currow.hasClass("editMark"))
            ThrowDialog("#dialogs", "Удаление", "Элемент был изменен. Вернуть первоначальное значение и пометить на удаление (изменения во вложенных таблицах так же будут отменены)?", function () {
                //dom
                NS_TableK1.RowCreator(currow, tableData, currentDataPool.olds[rownum]);
                currow.addClass("deleteMark").removeClass("editMark").children().last().children().first().button("disable");
                currow.children().last().children().last().text("Отменить удл.").button({icon: "ui-icon-trash"}).prev().button("disable");
                currow.children("td").children(".expand").button("disable");

                currow.children().children("img").addClass("hidden").parent().width(1);

                //pool
                PoolDataRemover(currentDataPool, "olds", null, rownum);
                PoolDataRemover(currentDataPool, "update", null, rownum);
                PoolDataInserter(currentDataPool, "delete", null, rownum, {id:rownum});

                $.each(tableData.expands, function (num, expand) {
                    $.each(expand, function (label, expTable) {
                        let tdp = queryDataPool[expTable.poolName];
                        $.each(Object.keys(tdp), function (key, level) {
                            PoolDataRemover(tdp, level, rownum, null);
                        });
                    })
                });
            });

        else if(currow.hasClass("deleteMark"))
        {
            //dom
            currow.removeClass("deleteMark");
            $(buttonSelector).text("Удалить").button({icon: "ui-icon-trash"}).prev().button("enable");
            $(buttonSelector).parent().parent().children("td").children(".expand").button("enable");
            //pool
            PoolDataRemover(currentDataPool, "delete", null, rownum);
        }
        else {
            if(currow.children().children("img").length > 0 && currow.children().children("img.hidden").length < 3){
                ThrowDialog("#dialogs", "Удаление", "Во вложенных таблицах имеются изминения. Пометка на удаление их отменит. Продолжить?", function () {
                    //dom
                    currow.addClass("deleteMark");
                    $(buttonSelector).text("Отменить удл.").button({icon: "ui-icon-trash"}).prev().button("disable");
                    $(buttonSelector).parent().parent().children("td").children(".expand").button("disable");

                    currow.children().children("img").addClass("hidden").parent().width(1);

                    //poll
                    PoolDataInserter(currentDataPool, "delete", null, rownum, {id:rownum});

                    $.each(tableData.expands, function (num, expand) {
                        $.each(expand, function (label, expTable) {
                            let tdp = queryDataPool[expTable.poolName];
                            $.each(Object.keys(tdp), function (key, level) {
                                PoolDataRemover(tdp, level, rownum, null);
                            });
                        })
                    });
                });
            }
            else{
                currow.addClass("deleteMark");
                $(buttonSelector).text("Отменить удл.").button({icon: "ui-icon-trash"}).prev().button("disable");
                $(buttonSelector).parent().parent().children("td").children(".expand").button("disable");
                //poll
                PoolDataInserter(currentDataPool, "delete", null, rownum, {id:rownum});
            }
        }
    };


    static EditHandler (buttonSelector, tableData){
        let currentDataPool = queryDataPool[tableData.poolName];
        let currow = $(buttonSelector).parent().parent();
        let rownum = currow.attr('id').split('-')[1];

        let iterator = 2;
        let oldrow = new Object({id:rownum});
        let currentForm = tableData.tableForm;



        $.each(currentForm, function(name) {
            oldrow[name] = currow.children("#c-"+iterator).text();
            ++iterator;
        });

        NS_TableK1.FormCreator(currow, tableData, oldrow);

        currow.children().children(".cancel").bind("click", function () {
            currow.children().children("select, :text, [type='number']").hide(150, function () {
                NS_TableK1.RowCreator(currow, tableData, oldrow);
            });
        });

        currow.children().children(".save").bind("click", function () {
            let data = NS_TableK1.SendDataCreator(currow, tableData, rownum);
            if(NS_TableK1.NotEmpty(currow, tableData)) {
                currow.children().children("select, :text, [type='number']").hide(150, function () {
                    NS_TableK1.RowCreator(currow,tableData, data);

                    if(currow.hasClass("addMark")){
                        //pool
                        PoolDataInserter(currentDataPool, "create", null, rownum, data);
                    }
                    if(currow.hasClass("editMark")){
                        //pool
                        PoolDataInserter(currentDataPool, "update", null, rownum, data);
                    }
                    if(!currow.hasClass("addMark") && !currow.hasClass("editMark")) {
                        //pool
                        PoolDataInserter(currentDataPool, "olds", null, rownum, oldrow);
                        PoolDataInserter(currentDataPool, "update", null, rownum, data);
                        //dom
                        currow.addClass("editMark");
                    }
                });
            }
        })
    };


    static ExpandHandler (buttonSelector, tableData){
        let currow =$(buttonSelector).parent().parent();
        let parentRowNum = currow.attr('id').split('-')[1];
        let expandNum= $(buttonSelector).attr("id").split('-')[1];
        let currentExp = Object.values(tableData.expands[expandNum])[0];


        let data = {
            queryName:currentExp.querySet['read'],
            queryData:{
                parent:parentRowNum
            }
        };

        let namespace = '';
        switch (currentExp.mainKey.length) {
            case 1:{namespace = NS_TableK2; break;}
            case 2:{console.log("NS_TableK3");/*namespace = NS_TableK3;*/break;}
            default:{namespace = NS_TableK1; break;}
        }

        $.post("/script/php/Select.php",data,function(res){
            $("#expTable-"+expandNum).children("table").attr("id", "parent-"+parentRowNum);
            namespace.TableCreator("#expTable-"+expandNum, currentExp, res);
            let caption = currentExp.caption + currow.children("#c-2").text();
            $("#expTable-"+expandNum).dialog({title: caption}).dialog("open");
        },"json")
            .fail(function (){
                ThrowNotice("#notices", "Error", "Ошибка!", "ajax", "Ошибка чтения вложенной таблицы")
            });
    };




    //создание заполняемой формы
    static FormCreator(rowHolder, tableData, data) {

        let iterator = 2;
        let currentForm = tableData.tableForm;
        let newRow = data.id;

        let expIndies = {};
        $.each(tableData.expands, function (key, expand) {
            expIndies[key] = rowHolder.children().children("#exp-"+key).siblings("img");
            if(!expIndies[key].length)
                expIndies[key] =
                     $("<img src='/image/greenMark.png' alt='add' class='indicator createInd hidden'>"+
                     "<img src='/image/blueMark.png' alt='edit' class='indicator updateInd hidden'>"+
                     "<img src='/image/redMark.png' alt='delete' class='indicator deleteInd hidden'>")
        });


        rowHolder.html("<td class='db' id='c-1'>"+newRow+"</td>");



        $.each(currentForm, function( id, type ) {
            let newCell = $("<td class='db' id='c-"+iterator+"'></td>");
            let inpWidth = rowHolder.siblings().first().children("#c-"+iterator).width()-4;
            let inpValue = isset(data[id])?data[id]:"";
            let newElem = NS_TableK1.FormElemCreator(type, id, inpWidth, inpValue);
            newCell.append(newElem);
            rowHolder.append(newCell);
            ++iterator;
        });

        let expands = tableData.expands;
        if(expands.length != 0)
            $.each(expands, function (key, expand){
                $.each(expand, function (label, expTable) {
                    let newButton = $("<button class='table expand ' id='exp-"+key+"'>"+label+"</button>");
                    let newCell = $("<td class='db fit' style='text-align: left' id='c-"+iterator+"'></td>");
                    newCell.append(newButton).append(expIndies[key]);
                    if(expIndies[key].siblings("img.hidden").length < 3)
                        newCell.width($("[id='exp-" + key + "']").width() + 10 + 38);
                    newCell.appendTo(rowHolder);
                    ++iterator;
                });
            });

        rowHolder.append(
            $("<td class='db options hidden' id='c-"+iterator+"' style='text-align: left'></td>").css("display", "table-cell")
                .append($("<button class='table save '>Сохранить</button>")).append("  ")
                .append($("<button class='table cancel '>Отмена</button>"))
        );
        rowHolder.children().children(".save").button({icon: "ui-icon-disk"});
        rowHolder.children().children(".cancel").button({icon: "ui-icon-cancel"});
        rowHolder.children().children(".expand").button({icon: "ui-icon-document"}).button("disable");


        rowHolder.children().children(":input").show(500).css('display','inline-block');
    }


    //функция создания элемента формы
    static FormElemCreator(elemType, elemId, width, value) {
        let newElem;
        switch (elemType) {
            case "select": {
                newElem = $("<select>", {
                    name:elemId,
                    id:elemId,
                    class: "hidden",
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
                        ThrowNotice("#notices", "Error", "Ошибка!", "ajax","Ошибка создания элемента (SelectField)");
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
                    class:"hidden",
                    min:0,
                    css:{
                        width:width,
                        minWidth: 40
                    }
                });
            }
        }
        return newElem;
    };


    //проверка пустых полей
    static NotEmpty (rowHolder, tableData){
        let errText = "";
        let iterator = 2;
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
            ThrowNotice("#notices", "Info", "Подсказка", "js",
                "Следующие поля не должны быть пустыми:<br><p style='margin-left: 5%'>"+errText+"</p>");
            return false;
        }
    }


    //функция взятия данных с формы
    static SendDataCreator(rowHolder, tableData) {
        let currentForm = tableData.tableForm;
        let currentId = rowHolder.attr("id").split("-")[1];
        let data = {};

        data.id=currentId;

        $.each(currentForm, function (name) {
            data[name] = rowHolder.children().children("#" + name).val();
        });

        return data;
    }


    //создает из указанной строки стандартную табличную запись с указанным набором данных
    static RowCreator(rowHolder, tableData, data) {
        let iterator = 1;
        let selects=[];

        let expIndies = {};
        $.each(tableData.expands, function (key, expand) {
            expIndies[key] = rowHolder.children().children("#exp-"+key).siblings("img");
        });

        rowHolder.html("");

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


        //переписать бы енту хуйню, но лень. еще сломаю боюсь, а так вроде работает
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



        let expands = tableData.expands;
        if(expands.length != 0)
            $.each(expands, function (key, expand){
                $.each(expand, function (label, expTable) {
                    let newButton = $("<button class='table expand' id='exp-"+key+"'>"+label+"</button>");
                    let newCell = $("<td class='db fit' style='text-align: left' id='c-"+iterator+"'></td>");
                    newCell.append(newButton).append(expIndies[key]);
                    if(expIndies[key].siblings("img.hidden").length < 3)
                        newCell.width($("[id='exp-"+key+"']").width()+10+38);
                    newCell.appendTo(rowHolder);
                    ++iterator;
                });
            });

        rowHolder.children().children(".expand").button({icon:"ui-icon-document"});
        rowHolder.children().children(".expand").bind("click", function(){
            NS_TableK1.ExpandHandler(this, tableData);
        });

        rowHolder.append($("<td class='db options hidden' id='c-"+iterator+"'></td>").css("display", "table-cell"));

        rowHolder.children().last().append("<button class='table edit'>Редактировать</button>  <button class='table delete'>Удалть</button>");

        rowHolder.children().children(".edit").button({icon: "ui-icon-pencil"}).bind("click", function(){
            NS_TableK1.EditHandler(this, tableData);
        });

        rowHolder.children().children(".delete").button({icon: "ui-icon-trash"}).bind("click", function(){
            NS_TableK1.DeleteHandler(this, tableData);
        });
    }
}

