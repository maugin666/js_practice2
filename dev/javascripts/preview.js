function Preview(arrayURL, arraySlides) {
  var slidesTemplate = Handlebars.compile($('#slides-template').html());

  function renderSlidesTemplate(arrayURL) {
    $('.js-preview').html(slidesTemplate({slides: arrayURL}));
  }

  function createSlides(array) {
    arraySlides.length = 0;
    if (Array.isArray(array)) {
      array.forEach(function (item, index) {
        arraySlides[index] = {id: index, image: item};
      });
    } else {
      alert('Эта структура не массив URL картинок.');
    }
  }

  function editSlide(id, field) {
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

  function deleteSlide(id) {
    arraySlides.forEach(function(item, i) {
      if (item.id === id) {
        arraySlides.splice(i, 1);
      }
    });
  }

  function listeners() {
    $(document)
      .on('change', '.js-add-comment, .js-add-link', function () {
        var id = parseInt($(this).data('id'));

        editSlide(id, $(this));
      })
      .on('click', '.js-remove-slide', function () {
        var id = parseInt($(this).data('id'));

        deleteSlide(id);
        renderSlidesTemplate(arraySlides);
      });
  }

  listeners();

  this.init = function () {
    createSlides(arrayURL);
    renderSlidesTemplate(arraySlides);
  };
}
