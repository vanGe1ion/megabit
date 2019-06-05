<table style="width: 100%">
    <tr>
        <td width="100px" onclick='window.location.href="<?= Router::FullRoute(Routes::MAIN)?>"'><img src="/image/headlogo.png" alt="Site logo" class="top"></td>
        <td><h1 class="top" onclick='window.location.href="<?= Router::FullRoute(Routes::MAIN)?>"'> <?= SITE_NAME;?></h1></td>
        <td>
            <!--timeanddate.com clocks-->
            <iframe src="http://free.timeanddate.com/clock/i6rch9a3/n4427/tlru33/fn15/fs19/tct/pct/pa3/tt0/tw1/tm1/th1/ta1/tb4" frameborder="0" width="157" height="50" allowTransparency="true"></iframe>
        </td>
        <td class="auth">
            <? if(StatFuncs::LoggedIn()){ ?>
                <p style="font-size: 20px" class="top">Вы вошли как: <?= isset($_SESSION['fullname']) ? $_SESSION['fullname'] : $_SESSION['login'] ?></p>
                <p class="top"><button class="auth" onclick='window.location.href = "<?= Router::FullRoute(Routes::LOGOUT)?>"'>Выйти</button></p>
            <?}?>
        </td>
    </tr>
    <tr>
        <td colspan="4">
            <hr class="template">
        </td>
    </tr>
</table>

