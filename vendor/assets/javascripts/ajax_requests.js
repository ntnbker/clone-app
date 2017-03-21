  document.addEventListener("turbolinks:load", function() {
    $('#trady_select').on("change",(function() {
      $.ajax({
        url: "/trady_information",
        type: "GET",
        dataType: "script",
        data:{
          trady_id:$("#trady_select option:selected").val()
          
        }
      });
    }));


  });

document.addEventListener("turbolinks:load", function() {
  $('#trady_work_order_select').on("change",(function() {
      $.ajax({
        url: "/trady_information",
        type: "GET",
        dataType: "script",
        data:{
          trady_id:$("#trady_work_order_select option:selected").val()
          
        }
      });
    }));

  });


document.addEventListener("turbolinks:load", function() {
  
  $('#check_for_landlord').click(function() { 

    alert( "hello" );

    $.ajax({
        url: "/trady_information",
        type: "GET",
        dataType: "script",
        data:{
          trady_id:$("#trady_work_order_select option:selected").val()
          
        }
      });






  });

});











  

