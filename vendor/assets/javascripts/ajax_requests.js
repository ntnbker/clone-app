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

