function Clickme(){



    var title = $('a').attr('title');

    var sal = ( $('a').attr('href') )


     var  val = $("input").attr("checked")
};

function excatname()
{
    var findname = $('input').find("[value='Suresh']")
    findname.attr("value","ganesh")
    var vals = document.getElementById("reg3").value
}


function doLoop(){

    $('input').each(function(i, obj){
        alert(obj.value)
    })

}

//  alert ( $('p').attr('title') );

 

 

 