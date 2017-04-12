$(function () {
    // slide events
  $currentSlideIndex = 0;
  // swipe events
  $('.slide-image').swipe({
    swipeLeft: function (event) {
      switchSlide('next');
    },
    swipeRight: function (event) {
      switchSlide('prev');
    }
  });

  switchSlide();
});

function switchSlide(type) {

  var $length = $('.slider .slide-image').length;

  if (type == 'next') {
    $currentSlideIndex++;
    if ($currentSlideIndex > $length - 1) {
      $currentSlideIndex = 0;
    }
  } else if (type == 'prev') {
    $currentSlideIndex--;
    if ($currentSlideIndex < 0) {
      $currentSlideIndex = $length - 1;
    }
  }

  $('.slider .slide-image')
    .removeClass('active')
    .eq($currentSlideIndex).addClass('active');

  $('.slider .slide-intro')
    .removeClass('active')
    .eq($currentSlideIndex).addClass('active');

  if ($interval !== undefined) {
    clearInterval($interval);
  }

  $interval = setInterval(function () {
    switchSlide('next');
  }, 10000);
}