<!DOCTYPE HTML>
<html  lang="ru">

<!-- Page Header -->

    <head>
        <meta charset="UTF-8">
        <title><?=$data->pageTitle.' <~> '.SITE_NAME ?></title>
        <link rel="shortcut icon" href="/image/favicon.ico" type="image/x-icon">

        <!--libraries-->
        <? include "template_view/libraries.html" ?>

        <!--Project data-->
        <!--scripts-->
        <? include "template_view/scripts.php" ?>
        <!--stylesheets-->
        <? include "template_view/stylesheets.html" ?>

    </head>

    <!-- Page Body -->
    <body>
        <div class="wrapper">
            <div class="content">



                <!-- Header -->
                <header>
                    <? include "template_view/header.php" ?>
                </header>



                <!-- Header Navigation -->
                <nav>
                    <? include "template_view/headNavigation.php" ?>
                </nav>



                <!-- Main -->
                <main>
                    <?php include 'application/views/content/'.$content_view; ?>
                </main>


            </div><!--content-->



            <!-- Footer -->
            <footer>
                <div class="footer">

                    <!--Dialogs-->
                    <?php include 'template_view/dialogs.html' ?>

                    <!-- Highlights / Errors -->
                    <?php include 'template_view/notifies.html' ?>

                    <!-- Footer Navigation/Content -->
                    <? include "template_view/footer.php" ?>


                </div>
            </footer>

        </div><!--wrapper-->

    </body>
</html>