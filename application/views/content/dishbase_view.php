<table align="center" class="mainTable data">


    <?$tableData = $data->tableData;?>

    <caption><?=$tableData->caption?></caption>


    <tr id="headRow">
        <?$i=1;
        foreach ($tableData->headRow as $label) {
            echo "<th class='db' id='c-".$i."'>".$label."</th>";
            ++$i;
        }
        foreach ($tableData->expands as $key=>$expand)
            foreach ($expand as $label=>$expandTable){
                echo "<th class='db expands fit' id='c-".$i."'>".$label."</th>";
                ++$i;
        }
        echo "<th class='db options fit' id='c-".$i."'>Опции</th>";
        ?>
    </tr>


    <?  $i=1;
    while($res = mysqli_fetch_array($tableData->queryResult)) {
        $i=1;
        echo "<tr id='row-".$res[0]."'>";
        foreach ($tableData->headRow as $trow => $label) {
            echo "<td class='db' id='c-".$i."'>" . $res[$trow] . "</td>";
            ++$i;
        }


        foreach ($tableData->expands as $key => $expand)
            foreach ($expand as $label => $expandTable){
                echo "<td style='text-align: left' class='db' id='c-".$i."'>";
                echo "<button class='table expand' id='exp-".$key."'>".$label."</button>";
                echo "<img src='/image/greenMark.png' alt='add' class='indicator createInd hidden'>";
                echo "<img src='/image/blueMark.png' alt='edit' class='indicator updateInd hidden'>";
                echo "<img src='/image/redMark.png' alt='delete' class='indicator deleteInd hidden'>";
                echo "</td>";
                ++$i;
        }
    ?>
        <td  class="db options" id="c-<?=$i?>">
            <button class="table edit">Редактировать</button>
            <button class="table delete">Удалить</button>
        </td>
    </tr>
    <?}?>


    <tr class="options">
        <td  class="db" colspan="<?= $i-1?>"></td>
        <td  style="padding: 5px;">
            <button class="table add">Добавить</button>
        </td>
    </tr>


</table>

<!-- Expands -->
<?foreach ($tableData->expands  as $key=>$val){?>
<div id="expTable-<?=$key?>" class="hidden">
    <table class="data"></table>
</div>
<?}?>

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
    var TableData = <?=json_encode($tableData)?>;
</script>