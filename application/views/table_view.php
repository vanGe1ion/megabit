<table align="center" class="mainTable data">


    <tr id="headRow">
        <?  $tableData = $data->tableData;
        $i=1;
        foreach ($tableData->headRow as $label) {
            echo "<th class='db' id='c-".$i."'>".$label."</th>";
            ++$i;
        }
        echo "<th class='db'id='c-".$i."'>Опции</th>";
        ?>
    </tr>


    <?
    while($res = mysqli_fetch_array($tableData->querryResult)) {
            echo "<tr id='row-".$res[0]."'>";
            $i=1;
            foreach ($tableData->headRow as $trow => $label) {
                echo "<td class='db' id='c-".$i."'>" . $res[$trow] . "</td>";
                ++$i;
            }
            $subcaption = $res[$tableData->parentKey];
    ?>
        <td  class="db" id="c-<?=$i?>">
            <? $subButtons = $tableData->subButtons;
                if(count($subButtons) != 0){
                    foreach ($subButtons as $tableNum => $label){?><!--as $label => $link-->
                        <button class="table expand" id="sub-<?=$tableNum?>"><?=$label?></button><!--onclick="document.location.href='<? //echo $link."/".$res[0]?>//'"-->
            <?}}?>
            <button class="table edit">Редактировать</button>
            <button class="table delete">Удалить</button>
        </td>
    </tr>
    <?}?>



    <tr id="adder"></tr>


    <tr>
        <td  class="db"  colspan="<? echo count($tableData->headRow) ?>"></td>
        <td  style="padding: 5px;">
            <button class="table add">Добавить</button>
        </td>
    </tr>
    <caption><?echo $tableData->caption.$subcaption?></caption>
</table>



<div id="subTable">
    <table class="data">

    </table>
</div>



<!--Dialogs-->
<div id="confirm" title="Подтвердите удаление">
    <p>Вы дествительно хотите удалить этот элемент?</p>
</div>

<div id="isEmpty" title="Внимание">
    <p>Следующие поля не должны быть пустыми:</p>
    <p id="empf"></p>
</div>



<!-- Highlight / Error -->
<div id="ajaxError" title="Ошибка!" class="ui-widget ui-state-error ui-corner-all" style="display: none">
    <p>
        <span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>
        <strong> ajaxError: </strong>
        <span id="text"></span>
    </p>
</div>

<div id="sqlError" title="Ошибка!" class="ui-widget ui-state-highlight ui-corner-all" style="display: none">
    <p>
        <span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span>
        <strong> mySqlError: </strong>
        <span id="text"></span>
    </p>
</div>




<script>
    var tableForm = <?=json_encode($tableData->tableForm)?>;
    var tableMark = <?=json_encode($tableData->tableMark)?>;
    var subButtons = <?=json_encode($tableData->subButtons)?>;
    var subTables = <?=json_encode($tableData->subTables)?>;
</script>


<div id="ajaxHolder"></div>