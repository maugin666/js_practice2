function Slider(arraySlides, options) {
  var
    _launchSlider,
    _sliderX,
    _slideX,
    _$sliderItem,
    _$sliderList,
    _$currentSlide,
    _singleWidth,
    _slidesCount,
    _fullWidth,
    _sliderTemplate = Handlebars.compile($('#slider-template').html());

  _renderSliderTemplate(arraySlides);
  if (options.autoplay) _autoplaySlider();
  _listeners();

  function _renderSliderTemplate(arraySlides) {
    $('.js-slider').html(_sliderTemplate({slides: arraySlides}));
  }

  function _moveSlide(_nextPosition) {
    _$sliderItem = $('.js-slider-item');
    _$currentSlide = $('.js-slider-item.active');
    _$sliderList = $('.js-slider-list');
    _singleWidth = _$sliderItem.width();
    _slidesCount = _$sliderItem.length;
    _fullWidth = _slidesCount * _singleWidth;

    if (_nextPosition >= _slidesCount) {
      _moveBorderSlide(_singleWidth, -_fullWidth, 0);
      _nextPosition = 0;
    } else if (_nextPosition < 0) {
      _moveBorderSlide(-_fullWidth, _fullWidth, (-(_slidesCount - 1) * _singleWidth));
      _nextPosition = parseInt(_$sliderItem.last().data('position'));
    } else {
      _sliderX = -_nextPosition * _singleWidth;
      _animatedMove(_sliderX, _$sliderList);
      _setActive(_nextPosition, _$currentSlide);
    }

  }

  function _moveBorderSlide(a, b, c) {
    _sliderX = a;
    _slideX = b;
    _reposition(_sliderX, _slideX, _$currentSlide, _$sliderList);
    _sliderX = c;
    _makeCarouselEffect(_sliderX, _$sliderList);
  }

  function _resetSlide() {
    $('.js-slider-item.active').css({transform: ''});
    console.log(_nextPosition);
    _setActive(_nextPosition, _$currentSlide);
    $('.js-slider-list').off('transitionend', _resetSlide);
  }

  function _reposition(_sliderX, _slideX, _$currentSlide, _$sliderList) {
    _$sliderList.css({transform:'translateX(' + _sliderX + 'px)'});
    _$currentSlide.css({transform:'translateX(' + _slideX + 'px)'});
  }

  function _setActive(position, _$currentSlide) {
    _$currentSlide.removeClass('active');
    $('.slider-item[data-position="' + position + '"]').addClass('active');
    $('.js-bullet[data-position="' + position + '"]').addClass('active').siblings().removeClass('active');
  }

  function _makeCarouselEffect(_sliderX, _$sliderList) {
    _$sliderList.on('transitionend', _resetSlide);
    setTimeout(function () { _animatedMove(_sliderX, _$sliderList); }, 10);
  }

  function _animatedMove(_sliderX, _$sliderList) {
    _$sliderList.addClass('animated').css({transform:'translateX(' + _sliderX + 'px)'});
    _$sliderList.on('transitionend', _unsetAnimated);
  }

  function _unsetAnimated() {
    $('.js-slider-list').removeClass('animated').off('transitionend', _unsetAnimated);
  }






  function _getActiveSlidePosition() {
    return parseInt($('.js-slider-item.active').data('position'));
  }

  function _autoplaySlider() {
    _launchSlider = setInterval(function () {
      _moveSlide(_getActiveSlidePosition() + 1);
    }, options.delay)
  }

  function _listeners() {
    $(document)
      .on('click', '.js-btn-prev', function () {
        if ($('.js-slider-list').hasClass('animated')) return;

        _moveSlide(_getActiveSlidePosition() - 1);
      })
      .on('click', '.js-btn-next', function () {
        if ($('.js-slider-list').hasClass('animated')) return;

        _moveSlide(_getActiveSlidePosition() + 1);
      })
      .on('click', '.js-bullet', function () {
        var _position = parseInt($(this).data('position'));

        if (_position === _getActiveSlidePosition()) return;

        _moveSlide(_position);
      })
      .on('mouseenter', '.slider', function () {
        clearInterval(_launchSlider);
      })
      .on('mouseleave', '.slider', function () {
        _autoplaySlider();
      });
  }

}
