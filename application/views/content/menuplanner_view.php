<div style="text-align: center; padding: 3px"><label for="calendar">Выберите неделю: </label>
<input type="text" id="calendar" name="calendar" class="calendar" ></div>



<div class="main_block" style="margin-top: 30px">

    <div class="sub_block">


        <div id="w-0" class="table_block dayOfWeek">
            <div class="tableDate"></div>
            <table class="data menu" width="100%">


            </table>
        </div>

        <div id="w-1" class="table_block dayOfWeek">
            <div class="tableDate"></div>
            <table class="data menu" width="100%">


            </table>
        </div>


    </div>

    <div class="sub_block">


        <div id="w-2" class="table_block dayOfWeek">
            <div class="tableDate"></div>
            <table class="data menu" width="100%">


            </table>
        </div>

        <div id="w-3" class="table_block dayOfWeek">
            <div class="tableDate"></div>
            <table class="data menu" width="100%">


            </table>
        </div>


    </div>

    <div class="sub_block">


        <div id="w-4" class="table_block dayOfWeek">
            <div class="tableDate"></div>
            <table class="data menu" width="100%">


            </table>
        </div>

        <div id="w-5" class="table_block dayOfWeek">
            <div class="tableDate"></div>
            <table class="data menu" width="100%">


            </table>
        </div>


    </div>


</div>

<script>
    var tableData = <?=json_encode($data->tableData)?>;
    var subTables = tableData.subTables;
</script>