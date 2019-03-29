    <table align="center" class="data">

        <tr>
            <?  $tableData = $data->tableData;
            foreach ($tableData->headRow as $trow=>$label) {?>
                <th class="db"><?echo $label; ?></th>
            <?}?>
            <th  class="db">Опции</th>
        </tr>
        <?
        while($res = mysqli_fetch_array($tableData->querryResult)) {
                echo "<tr>";
                foreach ($tableData->headRow as $trow => $label) {

                    echo "<td  class=\"db\">" . $res[$trow] . "</td>";
                }
                $subcaption = $res[$tableData->parentKey];
        ?>
            <td  class="db">
                <? $subTable = $tableData->subTable;
                    if(count($subTable) != 0){//$subTable != NULL
                        foreach ($subTable as $label => $link)?>
                            <button class="table" onclick="document.location.href='<? echo $link."/".$res[0]?>'"><? echo $label?></button>
                <?}?>
                <button class="table" onclick="document.location.href='<? //echo "edit.php?fieldID=".$res[0]?>'">Редактировать</button>
                <button class="table" onClick="if(confirm('Вы действительно хотите удалить это поле?')) {document.location.href='<? //echo "edit.php?fieldID=".$res[0]?>'; return false;}">Удалить</button>
            </td>
        </tr>
        <?}?>
        <tr>
            <td  class="db"  colspan="<? echo count($tableData->headRow) ?>"></td>
            <td  style="padding: 5px;"><button class="table" onclick="document.location.href=''">Добавить</button></td>
        </tr>
        <caption><?echo $tableData->caption.$subcaption?></caption>
    </table>