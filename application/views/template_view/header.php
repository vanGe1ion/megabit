<table style="width: 100%">
    <tr>
        <td width="100px" onclick='window.location.href="<?= Router::FullRoute(Routes::MAIN)?>"'><img src="/image/headlogo.png" alt="Site logo" class="top"></td>
        <td><h1 class="top" onclick='window.location.href="<?= Router::FullRoute(Routes::MAIN)?>"'> <?echo SITE_NAME;?></h1></td>
        <td>
<!--            <span class="timenow"></span>-->
<!--            <script type="text/javascript" src="http://time100.ru/t.js"></script>-->
<!--            <script type="text/javascript">-->
<!--                time100.init({-->
<!--                    timenow:{zone:"Europe/Moscow",format:"%H:%i:%s"}-->
<!--                });-->
<!--            </script>-->
            <iframe src="http://free.timeanddate.com/clock/i6rch9a3/n4427/tlru33/fn15/fs19/tct/pct/pa3/tt0/tw1/tm1/th1/ta1/tb4" frameborder="0" width="157" height="50" allowTransparency="true"></iframe>
        </td>
        <td class="login">
            <?php if(StatFuncs::LoggedIn()){ ?>
                <p style="font-size: 20px" class="top">Вы вошли как: <? echo isset($_SESSION['fullname']) ? $_SESSION['fullname'] : $_SESSION['login'] ?></p>
                <p class="top"><button class="loging" onclick='window.location.href = "<?= Router::FullRoute(Routes::LOGOUT)?>"'>Выйти</button></p>
            <?php } ?>
        </td>
    </tr>
</table>
<hr class="template">
