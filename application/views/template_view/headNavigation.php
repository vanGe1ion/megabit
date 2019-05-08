<? $headMenu = $data->headerMenu; if(isset($headMenu)){  ?>
    <table style="margin-left: 100px; " ><!-- margin-bottom: 50px;-->
        <tr>
            <? foreach ( $headMenu as $label=>$link){?>
                <td><button class="hormenu" onclick="document.location.href='<?= $link?>'"><?echo $label?></button></td>
            <?}?>
        </tr>
    </table>
<?}?>