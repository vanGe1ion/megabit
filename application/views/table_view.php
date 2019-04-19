    <table align="center" class="data">


        <tr id="headRow">
            <?  $tableData = $data->tableData;
            $i=1;
            foreach ($tableData->headRow as $trow=>$label) {
                echo "<th class='db' id='c-".$i."'>".$label."</th>";
                ++$i;
            }
            echo "<th class='db'id='c-".$i."'>Опции</th>";
            ?>
        </tr>


        <?$i = 1;
        while($res = mysqli_fetch_array($tableData->querryResult)) {
                echo "<tr id='row-".$i."'>";
                $j=1;
                foreach ($tableData->headRow as $trow => $label) {
                    echo "<td class='db' id='c-".$j."'>" . $res[$trow] . "</td>";
                    ++$j;
                }
                $subcaption = $res[$tableData->parentKey];
        ?>
            <td  class="db" id="c-<?=$j?>">
                <? $subTable = $tableData->subTable;
                    if(count($subTable) != 0){//$subTable != NULL
                        foreach ($subTable as $label => $link)?>
                            <button class="table expand" onclick="document.location.href='<? echo $link."/".$res[0]?>'"><? echo $label?></button>
                <?}?>
                <button class="table edit">Редактировать</button>
                <button class="table delete">Удалить</button>
            </td>
        </tr>
        <?++$i;}?>



        <tr id="adder"></tr>


        <tr>
            <td  class="db"  colspan="<? echo count($tableData->headRow) ?>"></td>
            <td  style="padding: 5px;"><button class="table add">Добавить</button></td>
        </tr>
        <caption><?echo $tableData->caption.$subcaption?></caption>
    </table>

    <div id="confirm" title="Подтвердите удаление">
        <p>Вы дествительно хотите удалить этот элемент?</p>
    </div>

    <div id="isEmpty" title="Внимание">
        <p>Следующие поля не должны быть пустыми:</p>
        <p id="empf"></p>
    </div>

    <script>
        var adderElems = <?=json_encode($tableData->adderForm)?>;
        var tableMark = <?=json_encode($tableData->tableMark)?>;
    </script>