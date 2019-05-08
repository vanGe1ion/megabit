<script defer type="text/javascript" src="/script/js/commonScript.js"></script>
<?php
if(isset($script))
    foreach ($script as $scriptName)
        echo "<script defer type='text/javascript' src='/script/js/".$scriptName."'></script>"
?>