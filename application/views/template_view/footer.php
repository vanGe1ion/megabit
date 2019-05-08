<table  width="100%" >
    <tr>
        <td><hr class="template"></td>
    </tr>
    <tr>
        <td align="right" >
            <? $footMenu = $data->footerMenu; if(isset($footMenu)){?>
                <nav style="margin-right: 100px">
                    <? foreach ( $footMenu as $label=>$link){?>
                        <button class="hormenu" onclick="document.location.href='<?echo $link?>'"><?echo $label?></button>
                    <?}?>
                </nav>
            <?}?>
        </td>
    </tr>
    <tr>
        <td>
            <!--Footer content-->
            <?include "footerContent.php"?>
        </td>
    </tr>
</table>