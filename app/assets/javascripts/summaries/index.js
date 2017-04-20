$(document).ready(function() {
  new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true
  });
});

function showAction(id) {
  $('#' + id).toggle(200);
}
