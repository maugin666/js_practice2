function Slider(arraySlides, options) {
  var
    _launchSlider,
    _activePosition,
    _activeSlidePosition,
    _sliderTemplate = Handlebars.compile($('#slider-template').html());

  this.init = function () {
    _renderSliderTemplate(arraySlides);
    options.autoplay && _autoplay();
    _listeners();
  };

  function _renderSliderTemplate(arraySlides) {
    $('.js-slider').html(_sliderTemplate({slides: arraySlides}));
  }

  function _moveSlide(_nextPosition) {
    var
      _$sliderItem = $('.js-slider-item'),
      _$currentSlide = $('.js-slider-item.active'),
      _$sliderList = $('.js-slider-list'),
      _singleWidth = _$sliderItem.width(),
      _slidesCount = _$sliderItem.length,
      _fullWidth = _slidesCount * _singleWidth,
      _sliderOffsetX = -(_slidesCount - 1) * _singleWidth;

    if (_nextPosition >= _slidesCount) {
      _moveBorderSlide(_singleWidth, -_fullWidth, 0);
      _activePosition = 0;
    } else if (_nextPosition < 0) {
      _moveBorderSlide(-_fullWidth, _fullWidth, _sliderOffsetX);
      _activePosition = parseInt(_$sliderItem.last().data('position'));
    } else {
      _moveSliderList(-_nextPosition * _singleWidth, _$sliderList);
      _setActive(_nextPosition, _$currentSlide);
    }
  }

  function _moveBorderSlide(sliderListOffset, slideOffset, sliderOffsetX) {
    var $sliderList = $('.js-slider-list');

    _reposition(sliderListOffset, slideOffset, $('.js-slider-item.active'), $sliderList);
    _makeCarouselEffect(sliderOffsetX, $sliderList);
  }

  function _resetSlide() {
    var
      $currentSlide = $('.js-slider-item.active'),
      $sliderList = $('.js-slider-list');

    $currentSlide.css({transform: ''});
    _setActive(_activePosition, $currentSlide);
    $sliderList.off('transitionend', _resetSlide);
  }

  function _reposition(sliderListOffset, slideOffset, $currentSlide, $sliderList) {
    $sliderList.css({transform:'translateX(' + sliderListOffset + 'px)'});
    $currentSlide.css({transform:'translateX(' + slideOffset + 'px)'});
  }

  function _setActive(position, $currentSlide) {
    $currentSlide.removeClass('active');
    $('.slider-item[data-position="' + position + '"]').addClass('active');
    _activeSlidePosition = $('.js-slider-item.active').data('position');
    $('.js-bullet[data-position="' + position + '"]').addClass('active').siblings().removeClass('active');
  }

  function _makeCarouselEffect(sliderListOffset, $sliderList) {
    $sliderList.on('transitionend', _resetSlide);
    setTimeout(function () { _moveSliderList(sliderListOffset, $sliderList); }, 10);
  }

  function _moveSliderList(sliderListOffset, $sliderList) {
    $sliderList.addClass('animated').css({transform:'translateX(' + sliderListOffset + 'px)'});
    $sliderList.on('transitionend', _unsetAnimated);
  }

  function _unsetAnimated() {
    $('.js-slider-list').removeClass('animated').off('transitionend', _unsetAnimated);
  }

  function _autoplay() {
    _launchSlider = setInterval(function () {
      _moveSlide(_activeSlidePosition + 1);
    }, options.delay)
  }

  function _listeners() {
    $(document)
      .on('click', '.js-btn-prev', function () {
        if ($('.js-slider-list').hasClass('animated')) return;

        _moveSlide(_activeSlidePosition - 1);
      })
      .on('click', '.js-btn-next', function () {
        if ($('.js-slider-list').hasClass('animated')) return;

        _moveSlide(_activeSlidePosition + 1);
      })
      .on('click', '.js-bullet', function () {
        var position = parseInt($(this).data('position'));

        if (position === _activeSlidePosition) return;

        _moveSlide(position);
      })
      .on('mouseenter', '.slider', function () {
        clearInterval(_launchSlider);
      })
      .on('mouseleave', '.slider', function () {
        _autoplay();
      });
  }

}
