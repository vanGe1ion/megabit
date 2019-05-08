<?$errorData = $data->errorData;?>
<h1 align='center' style='margin-top: 60px' ><?  echo $errorData->title; ?></h1><br>
<p class = error><? echo $errorData->text; ?></p>
<p align="center">
<!--    <img src="/image/hollyhole.png" width="400px"><br><br>-->
    <button id="errorButton" class="error" onclick="window.location.href = '<? echo $errorData->link; ?>'"><? echo $errorData->button; ?></button>
</p>
