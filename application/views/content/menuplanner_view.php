<div style="text-align: center; padding: 3px">
    <label for="calendar">Выберите неделю: </label>
    <input type="text" id="calendar" name="calendar" class="calendar" >
</div>


<div class="main_block" style="margin-top: 30px">
    <?for($i = 0; $i < 3; ++$i){?>
        <div class="sub_block">
            <?for($j = 0; $j < 2; ++$j){?>
                <div id="w-<?=$i*2+$j?>" class="table_block dayOfWeek" align="center">
                    <table class="data menu"></table>
                </div>
            <?}?>
        </div>
    <?}?>
</div>


<script>
    var tableData = <?=json_encode($data->tableData)?>;
    var tableForm = tableData.tableForm;
    var tableMark = tableData.tableMark;
    var subButtons = tableData.subButtons;
    var subTables = tableData.subTables;
</script>
