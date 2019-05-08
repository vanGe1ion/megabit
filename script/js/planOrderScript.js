//$(document).ready(function () {
    $(".calendar").datepicker({
        dateFormat:"dd.mm.yy",
        selectWeek: true,
        onSelect:function(){
            //let week = ['пнд','втр','срд','чтв','птн','сбт','вск'];
            let curdate = $(this).val().split(".");
            let dates = [];
            let mydate = new Date($(this).datepicker('getDate'));
            console.log(mydate);

            // mydate.setDate(mydate.getDate()-1);
            console.log(new Date());

        }
    });

//}) ;
