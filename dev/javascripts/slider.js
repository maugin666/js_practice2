function Slider(arraySlides, options) {
  var
    launchSlider,
    sliderTemplate = Handlebars.compile($('#slider-template').html());

  function renderSliderTemplate(arraySlides) {
    $('.js-slider').html(sliderTemplate({slides: arraySlides}));
  }

  function moveSlide(nextPosition) {
    var
      $sliderList = $('.js-slider-list'),
      $sliderItem = $('.js-slider-item'),
      sliderX,
      slideX,
      $currentSlide = $('.js-slider-item.active'),
      singleWidth = $sliderItem.width(),
      slidesCount = $sliderItem.length,
      fullWidth = slidesCount * singleWidth;

    if (nextPosition >= slidesCount) {
      moveBorderSlide(singleWidth, -fullWidth, 0, 0);
    } else if (nextPosition < 0) {
      moveBorderSlide(-fullWidth, fullWidth, (-(slidesCount - 1) * singleWidth), parseInt($sliderItem.last().data('position')));
    } else {
      sliderX = -nextPosition * singleWidth;
      animatedMove(sliderX);
      setActive(nextPosition);
    }

    function moveBorderSlide(a, b, c, d) {
      sliderX = a;
      slideX = b;
      reposition(sliderX, slideX);
      sliderX = c;
      makeCarouselEffect(sliderX);
      nextPosition = d;
    }

    function resetSlide() {
      $currentSlide.css({transform: ''});
      setActive(nextPosition);
      $sliderList.off('transitionend', resetSlide);
    }
    function reposition(sliderX, slideX) {
      $sliderList.css({transform:'translateX(' + sliderX + 'px)'});
      $currentSlide.css({transform:'translateX(' + slideX + 'px)'});
    }
    function setActive(position) {
      $currentSlide.removeClass('active');
      $('.slider-item[data-position="' + position + '"]').addClass('active');
      $('.js-bullet[data-position="' + position + '"]').addClass('active').siblings().removeClass('active');
    }
    function makeCarouselEffect(sliderX) {
      $sliderList.on('transitionend', resetSlide);
      setTimeout(function () {animatedMove(sliderX);}, 10);
    }

    function animatedMove(x) {
      $sliderList.addClass('animated').css({transform:'translateX(' + x + 'px)'});
      $sliderList.on('transitionend', unsetAnimated);
    }

    function unsetAnimated() {
      $sliderList.removeClass('animated');
      $sliderList.off('transitionend', unsetAnimated);
    }


  }
  function getActiveSlidePosition() {
    return parseInt($('.js-slider-item.active').data('position'));
  }

  function autoplaySlider() {
    if (options.autoplay && !$('.js-slider').hasClass('visible')) {
      launchSlider = setInterval(function () {
        moveSlide(getActiveSlidePosition() + 1);
      }, options.delay)
    }
  }

  function listeners() {
    $(document)
      .on('click', '.js-btn-prev', function () {
        if ($('.js-slider-list').hasClass('animated')) return;

        moveSlide(getActiveSlidePosition() - 1);
      })
      .on('click', '.js-btn-next', function () {
        if ($('.js-slider-list').hasClass('animated')) return;

        moveSlide(getActiveSlidePosition() + 1);
      })
      .on('click', '.js-bullet', function () {
        var position = parseInt($(this).data('position'));

        if (position === getActiveSlidePosition()) return;

        moveSlide(position);
      })
      .on('mouseenter', '.slider', function () {
        //clearInterval(launchSlider);
      })
      .on('mouseleave', '.slider', function () {
        //autoplaySlider();
      });
  }

  //autoplaySlider();
  listeners();

  this.init = function () {
    renderSliderTemplate(arraySlides);
  };
}
