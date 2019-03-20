<nav>
    <table width="35%" align="center" class="data">
        <caption><h2>Главное меню</h2></caption>
        <? $menu = $data['menuButtons'];
        foreach ($menu as $label=>$link){?>
            <tr>
                <td><button class="menu" onclick="window.location.href = '<?echo $link?>'"><?echo $label?></button></td>
            </tr>
        <? } ?>
    </table>
</nav>