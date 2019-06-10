<table width="100%" >
    <tr>
        <td><hr class="pageHr"></td>
    </tr>
    <tr>
        <td align="right" >
            <? $footMenu = $data->footerMenu; if(isset($footMenu)){?>
                <div style="margin-right: 100px">
                    <? foreach ( $footMenu as $label=>$link){?>
                        <button class="horMenu" onclick="document.location.href='<?echo $link?>'"><?echo $label?></button>
                    <?}?>
                </div>
            <?}?>
        </td>
    </tr>
</table>