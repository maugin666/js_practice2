function Slider() {
  var
    self = this,
    position = 0,
    $sliderList = $('.slider-list'),
    $sliderItem = $('.slider-item'),
    maxWidth = $sliderItem.width() * ($sliderItem.length - 1);

  this.moveSlide = function(button, direction) {
    var $currentSlide = $('.js-slider-item.active');
    //$("#id").off('click');

    if (direction === 'right') {
      position -= $currentSlide.width();
      $sliderList.addClass('animated').css({left: position + 'px'});
      $currentSlide.removeClass('active').next('.js-slider-item').addClass('active');

      if (position <= -maxWidth) {
        position = 0;
        $sliderList.removeClass('animated').css({left: position + 'px'});
        $sliderList.children().first().addClass('active').siblings().removeClass('active');
        self.moveSlide('right');
      }

    } else if (direction === 'left') {
      position += $currentSlide.width();
      $sliderList.addClass('animated').css({left: position + 'px'});
      $currentSlide.removeClass('active').prev('.js-slider-item').addClass('active');

      if (position > 0) {
        position = -maxWidth;
        $sliderList.removeClass('animated').css({left: position + 'px'});
        $sliderList.children().last().addClass('active').siblings().removeClass('active');
        self.moveSlide('left');
      }
    }
    $('.js-bullet[data-id="' + $('.js-slider-item.active').data('id') + '"]').addClass('active').siblings().removeClass('active');
  };

  /*this.resetSlider = function () {
    if (position <= -maxWidth) {
      position = 0;
      $sliderList.removeClass('animated').css({left: position + 'px'});
      $sliderList.children().first().addClass('active').siblings().removeClass('active');
      $sliderList.off('transitionend', this.resetSlider);
    }
  };*/

  this.manageBullet = function($this,id) {
    var
      $slide = $('.js-slider-item[data-id="' + id + '"]'),
      offset = id * $slide.width();

    $sliderList.addClass('animated').css({left: '-' + offset + 'px'});
    $slide.addClass('active').siblings().removeClass('active');
    $this.addClass('active').siblings().removeClass('active');
  };

  this.autoplaySlider = function() {
    setInterval(function(){
      if (!$('.slider').hasClass('hover')) {
        self.moveSlide('right');
      }
    }, 7000)
  }

}
