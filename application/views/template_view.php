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
        <div class="pageWrapper">
            <div class="pageContent">



                <!-- Header Content-->
                <header>
                    <? include "template_view/headerContent.php" ?>
                </header>



                <!-- Header Navigation -->
                <nav>
                    <? include "template_view/headerNavigation.php" ?>
                </nav>



                <!-- Main -->
                <main>
                    <?php include 'application/views/content/'.$content_view; ?>
                </main>


            </div><!--pageContent-->



            <div class="pageFooter">


                    <!-- Dialogs -->
                    <div id="dialogs"></div>

                    <!-- Highlights / Errors -->
                    <div id="notices" align="center"></div>

                    <!-- Footer Navigation -->
                    <nav>
                        <? include "template_view/footerNavigation.php" ?>
                    </nav>

                    <!-- Footer Content -->
                    <footer>
                        <? include "template_view/footerContent.php" ?>
                    </footer>


            </div><!--pageFooter-->

        </div><!--pageWrapper-->

    </body>
</html>