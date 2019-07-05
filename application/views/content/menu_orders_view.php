<div class="mainBody" align="center">

    <div class="calendarMain">
        <div style="width: 200px;"></div>
        <div align="center">
            <h2 style="margin: 0;">Текущая неделя:<br><span></span></h2>
        </div>
        <div style="text-align: center;">
            <label for="calendar"><h3 style="margin: 3px;">Выбор недели:</h3></label>
            <input type="text" id="calendar" name="calendar" class="calendar">
            <div class="calendarButtons">
                <button id="prev" class="calendar">&lt;</button>
                <button id="today" class="calendar">#</button>
                <button id="next" class="calendar">&gt;</button>
            </div>
        </div>
    </div>
    <br>


    <div class="menuBody" style="width: 93%;">
        <?$week = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница"]?>

        <table id="mptable" class="data" style="width: 100%">
            <tr id="headRow">
                <th class="db fit">Тип блюда</th>
                <?foreach ($week as $key=>$dayWeek)
                    echo "<th id='c-".$key."' class='db'>".$dayWeek."<br><span></span></th>"?>
            </tr>



            <?$tableData = $data->tableData;
            while($res = mysqli_fetch_array($tableData->queryResult)) {?>
                <tr id="row-<?=$res["Dish_Type_ID"]?>">
                    <th class="db"><?=$res["Dish_Type_Name"]?></th>
                    <?foreach ($week as $key=>$dayWeek){?>
                        <td id="c-<?=$key?>" class="db"><div class="menuDishList"></div></td>
                    <?}?>
                </tr>
            <?}?>



            <tr class="options">
                <td class="db"></td>
                <?for($i = 0; $i <= count($week)-1; ++$i){?>
                <td id="c-<?=$i?>" class="db"></td>
                <?}?>
            </tr>


        </table>

    </div>

</div>

<!-- Waiter -->
<div class="overlay"></div>
<div class="wait-box ui-corner-all">
    <div class="wait-text">
        Пожалуйста, дождитесь выполнения операции
    </div>
    <div class="wait-img">
        <img src="/image/loader.gif"/>
    </div>
</div>

<!-- Script data -->
<script>
    var TableData = <?=json_encode($data->tableData)?>
</script>


