function Controller() {
  var
    arrayURL,
    arraySlides = [],
    options = {
      autoplay: true,
      delay: 7000
    },
    $inputState = $('.js-input'),
    $previewState = $('.js-preview'),
    $sliderState = $('.js-slider');

  function changeState(state) {
    state.addClass('visible').siblings().removeClass('visible');

  }

  function listeners() {
    $(document)
      .on('click', '.js-add-array', function (event) {
        event.preventDefault();
        try {
          arrayURL = JSON.parse($('.js-insert-array').val());
          new Preview(arrayURL, arraySlides);
          changeState($previewState);
        } catch (error) {
          alert("Ошибка! " + error);
        }
      })
      .on('click', '.js-back-step-one', function () {
        changeState($inputState);
      })
      .on('click', '.js-save-slides', function () {
        new Slider(arraySlides, options);
        changeState($sliderState);
      })
      .on('click', '.js-back-step-two', function () {
        changeState($previewState);
      });
  }

  listeners();
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
