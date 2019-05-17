<nav>
    <table align="center" >
        <caption><h2>Главное меню</h2></caption>
        <? $mainMenu = $data->mainMenu;
        foreach ($mainMenu as $label=>$link){?>
            <tr>
                <td><button class="mainMenu" onclick="window.location.href = '<?echo $link?>'"><?echo $label?></button></td>
            </tr>
        <? } ?>
    </table>
</nav>