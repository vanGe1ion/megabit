<div class="monitorMain">
    <div class="monitorSub">
        <div class="monitorSideBar">
            <?$tableData = $data->tableData;
            while($res = mysqli_fetch_array($tableData->queryResult)) {?>
                <button class="queueButton" id="qElem-<?=$res["Elem_ID"]?>">
                    <div style='margin-left: 8px;'><?=$res["Order_ID"]?></div>.
                    <div id="empID-<?=$res["Emp_ID"]?>" class="queueButtonLabel"><?=$res["Fullname"]?></div>
                </button>
            <?}?>
        </div>
        <div class="monitorContent">
            <div class="monitorEmployee">
                <h1 class="Fullname"></h1>
                <div class="empData"><div class="empDataLabel">Отдел:</div><span id="Department"/></div>
                <div class="empData"><div class="empDataLabel">Должность:</div><span id="Position"/></div>
                <div class="empData"><div class="empDataLabel">Стол:</div><span id="Table"/></div>
                <div class="empData"><div class="empDataLabel">Смена:</div><span id="Shift"/></div>
                <hr class="pageHr">
            </div>
            <div class="monitorOrder">
                <div class="orderData"></div>
                <hr class="pageHr">
                <div class="orderSum">
                    <div>Сумма заказа:</div>
                    <span id="sum"></span>
                    <button class="orderClose">Закрыть заказ</button>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- Waiter -->
<?include "application/views/template_view/waiter.html"?>


<!-- Script data -->
<script>
    var TableData = <?=json_encode($tableData)?>;
    var QUEUE_LISTENING_INTERVAL = <?=QUEUE_LISTENING_INTERVAL?>;
</script>