<?$errorData = $data['errorData'];?>
<h1 align='center' style='margin-top: 60px' ><?  echo $errorData['title']; ?></h1><br>
<p class = error><? echo $errorData['text']; ?></p><br><br>
<p align="center">
    <button class="error" onclick="window.location.href = '<? echo $errorData['link']; ?>'"><? echo $errorData['button']; ?></button>
</p>
