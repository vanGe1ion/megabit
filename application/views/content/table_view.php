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



<script>
    var tableForm = <?=json_encode($tableData->tableForm)?>;
    var tableMark = <?=json_encode($tableData->tableMark)?>;
    var subButtons = <?=json_encode($tableData->subButtons)?>;
    var subTables = <?=json_encode($tableData->subTables)?>;
</script>
