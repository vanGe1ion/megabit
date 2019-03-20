<nav>
    <table width="35%" align="center">
        <caption><h2>Главное меню</h2></caption>
        <? $menu = $data['menuButtons'];
        foreach ($menu as $key=>$value){?>
            <tr>
                <td><button class="menu" onclick="window.location.href = '<?echo $value?>'"><?echo $key?></button></td>
            </tr>
        <? } ?>
<!--            <tr>-->
<!--                <td><button class="menu" onclick="window.location.href = ''">Управление меню</button></td>-->
<!--            </tr>-->
    </table>
</nav>