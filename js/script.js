$(document).ready(function(){
	var program = 
	
	$.ajax({   //create an ajax request to display.php
		type: "GET",
		url: "/getprogram2" + program,             
		dataType: "json",   //expect html to be returned                
		success: function(data){ 
			if(data) {
                for(var i=0;i<data.length;i++) {
                  $("#output").append("<p>"+data[i].programName+"<p>")
                }
            }
          },
          error: function(jqXHR, textStatus, errorThrown){
              alert('error: ' + textStatus + ': ' + errorThrown);
          }
      });

      
	$("#button").click(function(){
		$("#frm").show();
});

});
