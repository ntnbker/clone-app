$( document ).ready(function() {
    /*var input = document.getElementById('pac-input');
    var options = {types: ['address'], componentRestrictions: {country: 'au'}};
    var autocomplete = new google.maps.places.Autocomplete(input,options);*/

    // This resets the web page when we go back to the home page
  var $input = $('#refresh');

  $(document).on('change keyup paste', 'input[type="email"]', function(e){
    if (e.ctrlKey) {
        if (e.keyCode == 65 || e.keyCode == 97) { // 'A' or 'a'
          e.target.select();
        } 
    }else {
      if(e.key != "Control") {
        var value = $(this).val();
        if(/^[A-Z]/.test(e.key)) {
          $(this).val(value.toLowerCase());
        }
      }
    }
  });

  $input.val() == 'yes' ? location.reload(true) : $input.val('yes');
  // google.maps.event.addDomListener(window, 'turbolinks:load', initialize);
});

function getAddressOfGoogleMap() {
	var input = document.getElementById('pac-input');
  var options = {types: ['address'], componentRestrictions: {country: 'au'}};
  var autocomplete = new google.maps.places.Autocomplete(input,options);
}
