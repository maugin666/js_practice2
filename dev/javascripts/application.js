function Controller() {
  var
    preview = new Preview(),
    slider;

  function listeners() {
    $(document)
      .on('click', '.js-add-array', function (event) {
        event.preventDefault();
        try {
          var value = $('.js-insert-array').val();
          preview.createSlides(JSON.parse(value));
          preview.renderSlidesTemplate();
        } catch (error) {
          alert("Ошибка! " + error);
        }
      })
      .on('click', '.js-back-step-one', function () {
        preview.renderInputTemplate();
      })
      .on('change', '.js-add-comment, .js-add-link', function () {
        preview.editSlide();
      })
      .on('click', '.js-save-slides', function () {
        preview.renderSliderTemplate();
        slider = new Slider();
        slider.autoplaySlider();
      })
      .on('click', '.js-remove-slide', function () {
        var id = parseInt($(this).data('id'));
        preview.deleteSlide(id);
        preview.renderSlidesTemplate();
      })
      .on('click', '.js-btn-prev', function () {
        slider.moveSlideToIndex($(this).data('direction'));
      })
      .on('click', '.js-btn-next', function () {
        slider.moveSlideToIndex($(this).data('direction'));
      })
      .on('click', '.js-bullet', function () {
        var position = parseInt($(this).data('position'));

        slider.manageBullet(position);
      })
      .on('mouseenter', '.slider', function () {
        clearInterval(slider.launchSlider);
      })
      .on('mouseleave', '.slider', function () {
        slider.autoplaySlider();
      })
      .on('click', '.js-back-step-two', function () {
        preview.renderSlidesTemplate();
      });
  }

  this.init = function () {
    console.log('init');
    preview.renderInputTemplate();
    listeners();
  };

}

$(document).ready(function () {
  new Controller().init();

  var qqq = '[\
    "https://c1.staticflickr.com/3/2491/3751647375_4695b378de_z.jpg",\
    "https://c1.staticflickr.com/3/2443/3752426198_ebe03fa615_z.jpg",\
    "https://c2.staticflickr.com/2/1032/3175022066_57fce505be_z.jpg",\
    "https://c1.staticflickr.com/3/2528/3751624573_08815f8950_z.jpg"\
  ]';
  $('.js-insert-array').val(qqq);
});
