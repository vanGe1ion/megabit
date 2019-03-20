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
                    <?php if(StatFuncs::LoggedIn()){ ?>
                        <p style="font-size: 20px">Вы вошли как: <? echo isset($_SESSION['fullname']) ? $_SESSION['fullname'] : $_SESSION['login'] ?></p>
                        <p><button class="loging" onclick="window.location.href = 'authorisation/logout'">Выйти</button></p>
                    <?php } ?>
                </td>
            </tr>
        </table>
        <hr>
    </header>

    <!-- Header Navigation -->

    <? $headMenu = $data['headerMenu']; if(isset($headMenu)){  ?>
    <nav>
        <table style="margin-left: 100px; margin-bottom: 50px;" >
            <tr>
                <? foreach ( $headMenu as $label=>$link){?>
                    <td><button class="hormenu" onclick="document.location.href='<?echo $link?>'"><?echo $label?></button></td>
                <?}?>
            </tr>
        </table>
    </nav>
    <?}?>

    <!-- Main -->

    <main>
        <?php include 'application/views/'.$content_view; ?>
    </main>

</div>

<!-- Footer Navigation-->

<footer class="footer">
    <table  width="100%" >
        <tr>
            <td colspan="2"><hr></td>
        </tr>
        <tr>
            <td align="right" >
                <? $footMenu = $data['footerMenu']; if(isset($footMenu)){?>
                    <nav style="margin-right: 100px">
                        <? foreach ( $footMenu as $label=>$link){?>
                            <button class="hormenu" onclick="document.location.href='<?echo $link?>'"><?echo $label?></button>
                        <?}?>
                    </nav>
                <?}?>
            </td>
        </tr>
    </table>
</footer>

</body>
</html>





