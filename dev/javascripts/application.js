function Controller() {
  var
    preview = new Preview(),
    slider = new Slider();

  function listeners() {
    $(document)
      .on('click', '.js-add-array', function (event) {
        event.preventDefault();
        try {
          var value = $('.js-insert-array').val();
          preview.createData(JSON.parse(value));
          preview.renderSlidesTemplate();
        } catch (error) {
          alert("Ошибка! " + error);
        }
      })
      .on('click', '.js-back-step-one', function () {
        preview.renderInputTemplate();
      })
      .on('change', '.js-add-comment, .js-add-link', function () {
        preview.editData();
      })
      .on('click', '.js-save-slides', function () {
        preview.renderSliderTemplate();
        slider.autoplaySlider();
      })
      .on('click', '.js-remove-slide', function () {
        var id = parseInt($(this).data('id'));
        preview.deleteData(id);
        preview.renderSlidesTemplate();
      })
      .on('click', '.js-btn-prev', function () {
        slider.moveSlide($(this).data('dir'));
      })
      .on('click', '.js-btn-next', function () {
        slider.moveSlide($(this).data('dir'));
      })
      .on('click', '.js-bullet', function () {
        var id = parseInt($(this).data('id'));

        slider.manageBullet($(this),id);
      })
      .on('mouseenter', '.slider', function () {
        $(this).addClass('hover');
      })
      .on('mouseleave', '.slider', function () {
        $(this).removeClass('hover');
      })
      .on('click', '.js-back-step-two', function () {
        preview.renderSlidesTemplate();
      })
      .on('transitionend', '.slider-list', function () {
        var inTransition = false;
        slider.resetSlider();
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
});
