function Controller() {
  var
    _arrayURL,
    _preview,
    _options = {
      autoplay: true,
      delay: 7000
    };

  function _changeState(stage) {
    $('.js-stage').each(function (index, element) {
      $(element).toggleClass('visible', stage === $(element).data('stage'));
    });
  }

  function _listeners() {
    $(document)
      .on('click', '.js-add-array', function (event) {
        event.preventDefault();
        try {
          _arrayURL = JSON.parse($('.js-insert-array').val());
          _preview = new Preview(_arrayURL);
          _preview.init();
          _changeState('preview-stage');
        } catch (error) {
          alert("Ошибка! " + error);
        }
      })
      .on('click', '.js-back-step-one', function () {
        _changeState('input-stage');
      })
      .on('click', '.js-save-slides', function () {
        new Slider(_preview.arraySlides, _options).init();
        _changeState('slider-stage');
      })
      .on('click', '.js-back-step-two', function () {
        _changeState('preview-stage');
      });
  }

  _listeners();
}

$(document).ready(function () {
  new Controller();
});
