$( document ).ready(function() {
    var input = document.getElementById('pac-input');
    var options = {types: ['address'], componentRestrictions: {country: 'au'}};
    var autocomplete = new google.maps.places.Autocomplete(input,options);

    // This resets the web page when we go back to the home page
  var $input = $('#refresh');

  $input.val() == 'yes' ? location.reload(true) : $input.val('yes');
  google.maps.event.addDomListener(window, 'turbolinks:load', initialize);
});


