<script defer type="text/javascript" src="/script/js/commonScript.js"></script>
<?php
if(isset($data->scripts))
    foreach ($data->scripts as $scriptFile)
        echo "<script defer type='text/javascript' src='/script/js/".$scriptFile."'></script>"
?>