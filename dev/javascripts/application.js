function Controller() {
  var
    _arrayURL,
    _arraySlides = [],
    _options = {
      autoplay: true,
      delay: 7000
    },
    _$inputState = $('.js-input'),
    _$previewState = $('.js-preview'),
    _$sliderState = $('.js-slider');

  function _changeState(state) {
    state.addClass('visible').siblings().removeClass('visible');

  }

  function _listeners() {
    $(document)
      .on('click', '.js-add-array', function (event) {
        event.preventDefault();
        try {
          _arrayURL = JSON.parse($('.js-insert-array').val());
          new Preview(_arrayURL, _arraySlides);
          _changeState(_$previewState);
        } catch (error) {
          alert("Ошибка! " + error);
        }
      })
      .on('click', '.js-back-step-one', function () {
        _changeState(_$inputState);
      })
      .on('click', '.js-save-slides', function () {
        new Slider(_arraySlides, _options);
        _changeState(_$sliderState);
      })
      .on('click', '.js-back-step-two', function () {
        _changeState(_$previewState);
      });
  }

  _listeners();
}

$(document).ready(function () {
  new Controller();
});
