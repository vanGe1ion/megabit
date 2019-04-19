<!DOCTYPE html>
<html  lang="ru">

<!-- Page Header -->

<head>
    <meta charset="UTF-8">
    <title><? echo $data->pageTitle.' <~> '.SITE_NAME ?></title>
    <link rel="shortcut icon" href="/image/favicon.ico" type="image/x-icon">

    <!--libraries-->
    <script  type="text/javascript" src="/library/jQuery/jQuery.js"></script>
    <script  type="text/javascript" src="/library/jQuery-UI/jQuery-UI.js"></script>
    <link rel="stylesheet" type="text/css" href="/library/jQuery-UI/jQuery-UI.css">

    <!--Project data-->
    <script defer type="text/javascript" src="/script/js/css_script.js"></script>
    <link rel="stylesheet" type="text/css" href="/css/style.css">
</head>

<!-- Page Body -->

<body class="wrapper">
<div class="content">

    <!-- Header -->

    <header>
        <table style="width: 100%">
            <tr>
                <td width="100px"><img src="/image/headlogo.png" alt="Megabit logo" class="top"></td>
                <td><h1 class="top"> <?echo SITE_NAME;?></h1></td>
                <td class="login">
                    <?php if(StatFuncs::LoggedIn()){ ?>
                        <p style="font-size: 20px">Вы вошли как: <? echo isset($_SESSION['fullname']) ? $_SESSION['fullname'] : $_SESSION['login'] ?></p>
                        <p><button class="loging" onclick='window.location.href = "<?echo Router::FullRoute(Routes::LOGOUT)?>"'>Выйти</button></p>
                    <?php } ?>
                </td>
            </tr>
        </table>
        <hr>
    </header>

    <!-- Header Navigation -->

    <? $headMenu = $data->headerMenu; if(isset($headMenu)){  ?>
    <nav>
        <table style="margin-left: 100px; " ><!-- margin-bottom: 50px;-->
            <tr>
                <? foreach ( $headMenu as $label=>$link){?>
                    <td><button class="hormenu" onclick="document.location.href='<?= $link?>'"><?echo $label?></button></td>
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
                <? $footMenu = $data->footerMenu; if(isset($footMenu)){?>
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