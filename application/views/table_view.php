    <table align="center" valign="center" class="data">

        <tr>
            <?  $tableData = $data['tableData'];
            foreach ($tableData['headRow'] as $trow=>$label) {?>
                <th class="db"><?echo $label; ?></th>
            <?}?>
            <th  class="db">Опции</th>
        </tr>
        <?
        while($res = mysqli_fetch_array($tableData['result'])) {
            echo "<tr>";
            foreach ($tableData['headRow'] as $trow => $label) {

                echo "<td  class=\"db\">" . $res[$trow] . "</td>";
            }
            //$val = $res[$subKey];
            ?>
            <td  class="db">
<!--                --><?// if ($subTable != ""){?>
<!--                    <button class="table" onclick="document.location.href='--><?// echo "dishes.php?tab=".$setTab."&fieldID=".$res[0]?>////'"><?//echo $subTable?><!--</button>-->
<!--                --><?//}?>
                <button class="table" onclick="document.location.href='<? //echo "edit.php?fieldID=".$res[0]?>'">Редактировать</button>
                <button class="table" onClick="if(confirm('Вы действительно хотите удалить это поле?')) {document.location.href='<? //echo "edit.php?fieldID=".$res[0]?>'; return false;}">Удалить</button>
            </td>
            </tr>
        <?}?>
        <tr>
            <td  class="db"  colspan="<? echo count($tableData['headRow']) ?>"></td>
            <td  style="padding: 5px;"><button class="table" onclick="document.location.href=''">Добавить</button></td>
        </tr>
        <caption><?echo $tableData['caption']?></caption>
    </table>