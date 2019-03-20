<!-- Page Header -->

<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <title><? echo $data['pageTitle'] ?></title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon">
</head>

<!-- Body -->

<body class="wrapper">
<div class="content">
    <!-- Header -->

    <header>
        <table style=" width: 100%;">
            <tr>
                <td><h1 class="top">MEGABIT CAFE</h1></td>
                <td style="text-align: right; padding-right: 200px">
                    <?php if(StatFuncs::LoggedIn()){ /*if($_SESSION['login']){*/ ?>
                        <p style="font-size: 20px">Вы вошли как: <? echo isset($_SESSION['fullname']) ? $_SESSION['fullname'] : $_SESSION['login'] ?></p>
                        <p><button class="loging" onclick="window.location.href = 'authorisation/logout'">Выйти</button></p>
                    <?php } ?>
                </td>
            </tr>
        </table>
        <hr>
    </header>

    <!-- Navigation -->

    <!-- Main -->

    <main>
        <?php include 'application/views/'.$content_view; ?>
    </main>

</div>

<!-- Footer -->

<footer class="footer">
<table  width="100%" > <!-- style="bottom: 30px; position: fixed;"-->
    <tr>
        <td colspan="2"><hr></td>
    </tr>
    <tr>
        <td align="right">
            <?if (0){?>
                <button style="margin-right: 100px" class="hormenu" onclick="document.location.href='main'">В главное меню</button>
            <?}?>
        </td>
    </tr>
</table>
</footer>

</body>
</html>





