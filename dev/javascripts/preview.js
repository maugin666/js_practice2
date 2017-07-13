function Preview(arrayURL, arraySlides) {
  var _slidesTemplate = Handlebars.compile($('#slides-template').html());

  _createSlides(arrayURL);
  _renderSlidesTemplate(arraySlides);
  _listeners();

  function _renderSlidesTemplate(arrayURL) {
    $('.js-preview').html(_slidesTemplate({slides: arrayURL}));
  }

  function _createSlides(array) {
    arraySlides.length = 0;
    if (Array.isArray(array)) {
      array.forEach(function (item, index) {
        arraySlides[index] = {id: index, image: item};
      });
    } else {
      alert('Эта структура не массив URL картинок.');
    }
  }

  function _editSlide(id, field) {
    arraySlides.forEach(function(item, i) {
      if (item.id === id) {
        if (field.hasClass('js-add-comment')) {
          item.comment = field.val();
        } else if (field.hasClass('js-add-link')) {
          item.link = field.val();
        }
      }
    });
  }

  function _deleteSlide(id) {
    arraySlides.forEach(function(item, i) {
      if (item.id === id) {
        arraySlides.splice(i, 1);
      }
    });
  }

  function _listeners() {
    $(document)
      .on('change', '.js-add-comment, .js-add-link', function () {
        var _id = parseInt($(this).data('id'));

        _editSlide(_id, $(this));
      })
      .on('click', '.js-remove-slide', function () {
        var _id = parseInt($(this).data('id'));

        _deleteSlide(_id);
        _renderSlidesTemplate(arraySlides);
      });
  }

}
