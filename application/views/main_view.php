<nav>
    <table width="35%" align="center" ><!-- class="data"-->
        <caption><h2>Главное меню</h2></caption>
        <? $mainMenu = $data->mainMenu;
        foreach ($mainMenu as $label=>$link){?>
            <tr>
                <td><button class="menu" onclick="window.location.href = '<?echo $link?>'"><?echo $label?></button></td>
            </tr>
        <? } ?>
    </table>
</nav>