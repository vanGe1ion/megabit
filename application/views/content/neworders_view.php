<div style="text-align: center; padding: 10px">
    <label for="calendar">Выберите неделю: </label>
    <input type="text" id="calendar" name="calendar" class="calendar" >
</div>


<div id="order_accord" class="accordion">
    <?for($i = 0; $i < 6; ++$i){?>
    <h2><a href="#" id="w-<?=$i?>"></a></h2>
    <div  class="day_order">
        <table class="data menu" style="margin: 0 auto"></table>
    </div>
    <?}?>
</div>



<script>
    var empID = <?=$_SESSION['empID']?>;
    var tableData = <?=json_encode($data->tableData)?>;
    //var tableForm = tableData.tableForm;
    var tableMark = tableData.tableMark;
    //var subButtons = tableData.subButtons;
    var subTables = tableData.subTables;
</script>