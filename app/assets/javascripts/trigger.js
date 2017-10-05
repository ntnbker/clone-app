$(function() {
  $('button').on('click', function(e) {
    var $a = $(this).find('a');
    if ($a && $a.attr('href') !== '') {
      window.location.replace($a.attr('href'));
      return;
    }
  })
});
