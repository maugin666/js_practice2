function Preview(arrayURL) {
  var
    self = this,
    _slidesTemplate = Handlebars.compile($('#slides-template').html());

  this.arraySlides = [];

  this.init = function () {
    _createSlides(arrayURL);
    _renderSlidesTemplate(self.arraySlides);
    _listeners();
  };

  function _renderSlidesTemplate(arrayURL) {
    $('.js-preview').html(_slidesTemplate({slides: arrayURL}));
  }

  function _createSlides(array) {
    //Проверяю, что пришел массив и в нем урлы, т.к. по идее можно все, что угодно на первом стейте ввести.
    if (Array.isArray(array)) {
      array.forEach(function (item, index) {
        if (String(item).match(/(https?:\/\/[^\s]+\.jpe?g)/i)) {
          self.arraySlides[index] = {id: index, image: item};
        }
      });
    }
  }

  function _editSlide($slide) {
    self.arraySlides.find(function(item) {
      if (item.id !== parseInt($slide.data('id'))) {
        return;
      }
      if ($slide.hasClass('js-add-comment')) {
        item.comment = $slide.val();
      }
      if ($slide.hasClass('js-add-link')) {
        item.link = $slide.val();
      }
    });
  }

  function _deleteSlide(id) {
    self.arraySlides.find(function(item, i) {
      if (item.id === id) {
        self.arraySlides.splice(i, 1);
        return true;
      }
    });
  }

  function _listeners() {
    $(document)
      .on('change', '.js-add-comment, .js-add-link', function () {
        _editSlide($(this));
      })
      .on('click', '.js-remove-slide', function () {
        var id = parseInt($(this).data('id'));

        _deleteSlide(id);
        _renderSlidesTemplate(self.arraySlides);
      });
  }

}
