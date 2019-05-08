<table style="width: 100%">
    <tr>
        <td width="100px" onclick='window.location.href="<?= Router::FullRoute(Routes::MAIN)?>"'><img src="/image/headlogo.png" alt="Site logo" class="top"></td>
        <td><h1 class="top" onclick='window.location.href="<?= Router::FullRoute(Routes::MAIN)?>"'> <?echo SITE_NAME;?></h1></td>
        <td class="login">
            <?php if(StatFuncs::LoggedIn()){ ?>
                <p style="font-size: 20px" class="top">Вы вошли как: <? echo isset($_SESSION['fullname']) ? $_SESSION['fullname'] : $_SESSION['login'] ?></p>
                <p class="top"><button class="loging" onclick='window.location.href = "<?= Router::FullRoute(Routes::LOGOUT)?>"'>Выйти</button></p>
            <?php } ?>
        </td>
    </tr>
</table>
<hr class="template">