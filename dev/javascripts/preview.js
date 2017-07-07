function Preview() {
  var
    arrayURL = [],
    arrayObjects = [],
    inputTemplate = Handlebars.compile($('#input-template').html()),
    slidesTemplate = Handlebars.compile($('#slides-template').html()),
    sliderTemplate = Handlebars.compile($('#slider-template').html()),
    $container = $('.js-container');


  this.createSlides = function (array) {
    if (arrayObjects.length !== 0 || arrayURL.length !== 0) {
      arrayObjects.length = 0;
      arrayURL.length = 0;
    }
    if (Array.isArray(array)) {
      array.forEach(function (item, index) {
        arrayURL.push(item);
        arrayObjects.push({
          id: index,
          image: item,
          link: '',
          comment: ''
        });
      });
    } else {
      alert('Эта структура не массив URL картинок.');
    }
  };

  this.editSlide = function () {
    arrayObjects.forEach(function (item) {
      var itemLink;

      itemLink = $('.js-add-link[data-id="' + item.id + '"]').val();
      item.comment = $('.js-add-comment[data-id="' + item.id + '"]').val();
      item.link = itemLink;
    });
  };

  this.deleteSlide = function (id) {
    arrayObjects.forEach(function(item, i) {
      if (item.id === id) {
        arrayObjects.splice(i, 1);
      }
    });
  };

  this.renderInputTemplate = function () {
    $container.html(inputTemplate({slides: arrayURL}));
  };

  this.renderSlidesTemplate = function () {
    $container.html(slidesTemplate({slides: arrayObjects}));
  };

  this.renderSliderTemplate = function () {
    $container.html(sliderTemplate({slides: arrayObjects}));
  };
}
