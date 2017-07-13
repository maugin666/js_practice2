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

  var qqq = '[\
    "https://c1.staticflickr.com/3/2491/3751647375_4695b378de_z.jpg",\
    "https://c1.staticflickr.com/3/2443/3752426198_ebe03fa615_z.jpg",\
    "https://c2.staticflickr.com/2/1032/3175022066_57fce505be_z.jpg",\
    "https://c1.staticflickr.com/3/2528/3751624573_08815f8950_z.jpg"\
  ]';
  $('.js-insert-array').val(qqq);
});
