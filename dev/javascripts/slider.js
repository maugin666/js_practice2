function Slider() {
  var
    self = this,
    $sliderList = $('.slider-list'),
    $sliderItem = $('.slider-item'),
    singleWidth = $sliderItem.width(),
    slidesCount = $sliderItem.length;

  this.moveSlideToIndex = function(direction, position) {
    var
      $currentSlide = $('.js-slider-item.active'),
      currentPosition = parseInt($currentSlide.data('position')),
      nextPosition,
      sliderX,
      slideX;

    if ($sliderList.hasClass('animated')) return;

    if (typeof(position) !== 'undefined') {
      nextPosition = position;
    } else if (direction === 'right') {
      nextPosition = currentPosition + 1;
    } else if (direction === 'left') {
      nextPosition = currentPosition - 1;
    }

    if (nextPosition >= slidesCount) {
      sliderX = singleWidth;
      slideX = -slidesCount * singleWidth;
      reposition(sliderX, slideX);
      nextPosition = 0;
      sliderX = 0;
      makeCarouselEffect(sliderX);
    } else if (nextPosition < 0) {
      sliderX = -slidesCount * singleWidth;
      slideX = -sliderX;
      reposition(sliderX, slideX);
      nextPosition = parseInt($sliderItem.last().data('position'));
      sliderX = -(slidesCount - 1) * singleWidth;
      makeCarouselEffect(sliderX);
    } else {
      sliderX = -nextPosition * singleWidth;
      animatedMove(sliderX);
      setActive(nextPosition);
    }

    function makeCarouselEffect(sliderX) {
      $sliderList.on('transitionend', resetSlide);
      setTimeout(function () {animatedMove(sliderX);}, 10);
    }

    function reposition(sliderX, slideX) {
      $sliderList.css({transform:'translateX(' + sliderX + 'px)'});
      $currentSlide.css({transform:'translateX(' + slideX + 'px)'});
    }

    function resetSlide() {
      $currentSlide.css({transform: ''});
      setActive(nextPosition);
      $sliderList.off('transitionend', resetSlide);
    }

    function animatedMove(x) {
      $sliderList.addClass('animated').css({transform:'translateX(' + x + 'px)'});
      $sliderList.on('transitionend', unsetAnimated);
    }

    function unsetAnimated() {
      $sliderList.removeClass('animated');
      $sliderList.off('transitionend', unsetAnimated);
    }

    function setActive(position) {
      $currentSlide.removeClass('active');
      $('.slider-item[data-position="' + position + '"]').addClass('active');
      $('.js-bullet[data-position="' + position + '"]').addClass('active').siblings().removeClass('active');
    }
  };

  this.manageBullet = function (position) {
    var currentPosition = parseInt($('.js-slider-item.active').data('position'));

    if (position === currentPosition) return;

    self.moveSlideToIndex(null, position);
  };

  this.autoplaySlider = function () {
    self.launchSlider = setInterval(function () {
        self.moveSlideToIndex('right');
    }, 7000)
  }
}
