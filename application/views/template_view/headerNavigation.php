<? $headMenu = $data->headerMenu;?>
<table style="width: 100%; margin-bottom: 1%">
    <tr>
        <td><hr class="pageHr"></td>
    </tr>
    <tr>
        <td style="margin-left: 100px; ">
            <div style="margin-left: 100px; ">
                <? if(isset($headMenu)){
                    foreach ( $headMenu as $label=>$link){?>
                        <button class="horMenu" onclick="document.location.href='<?= $link?>'"><?echo $label?></button>
                    <?}?>
                <?}?>
            </div>
        </td>
    </tr>
</table>
